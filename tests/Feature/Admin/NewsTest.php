<?php

namespace Tests\Feature\Admin;

use App\Models\Category;
use App\Models\News;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class NewsTest extends TestCase
{
    /**
     * Guest cannot access admin news.
     */
    public function test_guest_cannot_access_admin_news(): void
    {
        $response = $this->get('/admin/news');

        $response->assertRedirect('/login');
    }

    /**
     * Authenticated user can view news list.
     */
    public function test_authenticated_user_can_view_news_list(): void
    {
        $user = User::factory()->create();
        $category = Category::create(['name' => 'Akademik', 'slug' => 'akademik']);

        News::create([
            'category_id' => $category->id,
            'author_id' => $user->id,
            'title' => 'Berita Pembelajaran',
            'slug' => 'berita-pembelajaran',
            'content' => 'Isi berita pembelajaran...',
            'status' => 'published',
            'published_at' => now(),
        ]);

        $response = $this->actingAs($user)->get('/admin/news');

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Admin/News/Index')
            ->has('news.data', 1)
        );
    }

    /**
     * Authenticated user can create news with valid image upload.
     */
    public function test_authenticated_user_can_create_news_with_image(): void
    {
        Storage::fake('public');
        $user = User::factory()->create();
        $category = Category::create(['name' => 'Akademik', 'slug' => 'akademik']);
        $file = UploadedFile::fake()->image('thumbnail.jpg', 600, 400);

        $response = $this->actingAs($user)->post('/admin/news', [
            'category_id' => $category->id,
            'title' => 'Berita Baru dengan Foto',
            'excerpt' => 'Ringkasan berita foto.',
            'content' => 'Konten lengkap berita foto.',
            'featured_image' => $file,
            'status' => 'published',
            'published_at' => now()->toDateTimeString(),
        ]);

        $response->assertRedirect('/admin/news');
        $response->assertSessionHas('success');

        $news = News::where('title', 'Berita Baru dengan Foto')->first();
        $this->assertNotNull($news);
        $this->assertNotNull($news->featured_image);
        Storage::disk('public')->assertExists($news->featured_image);
    }

    /**
     * Creating news rejects invalid file types.
     */
    public function test_creating_news_rejects_invalid_file_type(): void
    {
        Storage::fake('public');
        $user = User::factory()->create();
        $category = Category::create(['name' => 'Akademik', 'slug' => 'akademik']);
        $file = UploadedFile::fake()->create('document.pdf', 100);

        $response = $this->actingAs($user)->post('/admin/news', [
            'category_id' => $category->id,
            'title' => 'Berita File Salah',
            'content' => 'Konten...',
            'featured_image' => $file,
            'status' => 'draft',
        ]);

        $response->assertSessionHasErrors(['featured_image']);
    }

    /**
     * Creating news rejects oversized images (>2048KB).
     */
    public function test_creating_news_rejects_oversized_image(): void
    {
        Storage::fake('public');
        $user = User::factory()->create();
        $category = Category::create(['name' => 'Akademik', 'slug' => 'akademik']);
        $file = UploadedFile::fake()->image('huge.png')->size(3000);

        $response = $this->actingAs($user)->post('/admin/news', [
            'category_id' => $category->id,
            'title' => 'Berita Gambar Besar',
            'content' => 'Konten...',
            'featured_image' => $file,
            'status' => 'draft',
        ]);

        $response->assertSessionHasErrors(['featured_image']);
    }

    /**
     * Updating news and replacing image deletes the old image file.
     */
    public function test_updating_news_replaces_image_and_deletes_old_file(): void
    {
        Storage::fake('public');
        $user = User::factory()->create();
        $category = Category::create(['name' => 'Akademik', 'slug' => 'akademik']);

        $oldFile = UploadedFile::fake()->image('old.jpg');
        $oldPath = $oldFile->store('news', 'public');

        $news = News::create([
            'category_id' => $category->id,
            'author_id' => $user->id,
            'title' => 'Berita Asli',
            'slug' => 'berita-asli',
            'content' => 'Isi berita asli...',
            'featured_image' => $oldPath,
            'status' => 'published',
            'published_at' => now(),
        ]);

        Storage::disk('public')->assertExists($oldPath);

        $newFile = UploadedFile::fake()->image('new.jpg');

        $response = $this->actingAs($user)->put("/admin/news/{$news->id}", [
            'category_id' => $category->id,
            'title' => 'Berita Diperbarui',
            'content' => 'Isi berita diperbarui...',
            'featured_image' => $newFile,
            'status' => 'published',
        ]);

        $response->assertRedirect('/admin/news');
        $response->assertSessionHas('success');

        $news->refresh();
        $this->assertNotEquals($oldPath, $news->featured_image);
        Storage::disk('public')->assertMissing($oldPath);
        Storage::disk('public')->assertExists($news->featured_image);
    }

    /**
     * Deleting news cleans up its associated featured image file.
     */
    public function test_deleting_news_cleans_up_image(): void
    {
        Storage::fake('public');
        $user = User::factory()->create();
        $category = Category::create(['name' => 'Akademik', 'slug' => 'akademik']);

        $file = UploadedFile::fake()->image('to_delete.jpg');
        $path = $file->store('news', 'public');

        $news = News::create([
            'category_id' => $category->id,
            'author_id' => $user->id,
            'title' => 'Berita Dihapus',
            'slug' => 'berita-dihapus',
            'content' => 'Isi...',
            'featured_image' => $path,
            'status' => 'draft',
        ]);

        Storage::disk('public')->assertExists($path);

        $response = $this->actingAs($user)->delete("/admin/news/{$news->id}");

        $response->assertRedirect('/admin/news');
        $this->assertSoftDeleted('news', ['id' => $news->id]);
        $this->assertNotNull(News::withTrashed()->find($news->id)->deleted_at);
        $this->assertNull(News::find($news->id));
        Storage::disk('public')->assertMissing($path);
    }

    /**
     * Soft deleted news is not visible in regular admin listing.
     */
    public function test_soft_deleted_news_is_not_visible_in_admin_listing(): void
    {
        $user = User::factory()->create();
        $category = Category::create(['name' => 'Akademik', 'slug' => 'akademik']);

        $news = News::create([
            'category_id' => $category->id,
            'author_id' => $user->id,
            'title' => 'Berita Terhapus',
            'slug' => 'berita-terhapus',
            'content' => 'Isi berita...',
            'status' => 'published',
            'published_at' => now(),
        ]);

        $news->delete();
        $this->assertSoftDeleted($news);

        $response = $this->actingAs($user)->get('/admin/news');
        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Admin/News/Index')
            ->has('news.data', 0)
        );
    }

    /**
     * Validation rejects missing required fields.
     */
    public function test_validation_rejects_missing_required_fields(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post('/admin/news', [
            'title' => '',
            'content' => '',
            'category_id' => '',
            'status' => 'invalid_status',
        ]);

        $response->assertSessionHasErrors(['title', 'content', 'category_id', 'status']);
    }
}
