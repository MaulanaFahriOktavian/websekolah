<?php

namespace Tests\Feature\Admin;

use App\Models\Category;
use App\Models\News;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class CategoryTest extends TestCase
{
    /**
     * Guest cannot access categories list.
     */
    public function test_guest_cannot_access_categories(): void
    {
        $response = $this->get('/admin/categories');

        $response->assertRedirect('/login');
    }

    /**
     * Authenticated user can view categories list.
     */
    public function test_authenticated_user_can_view_categories_list(): void
    {
        $user = User::factory()->create();
        Category::create([
            'name' => 'Akademik',
            'slug' => 'akademik',
        ]);

        $response = $this->actingAs($user)->get('/admin/categories');

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Admin/Categories/Index')
            ->has('categories.data', 1)
        );
    }

    /**
     * Authenticated user can create a category.
     */
    public function test_authenticated_user_can_create_category(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post('/admin/categories', [
            'name' => 'Prestasi Sekolah',
            'description' => 'Kategori untuk berita prestasi.',
            'is_active' => true,
            'sort_order' => 1,
        ]);

        $response->assertRedirect('/admin/categories');
        $response->assertSessionHas('success');

        $this->assertDatabaseHas('categories', [
            'name' => 'Prestasi Sekolah',
            'slug' => 'prestasi-sekolah',
        ]);
    }

    /**
     * Category creation requires a name.
     */
    public function test_category_creation_requires_name(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post('/admin/categories', [
            'name' => '',
        ]);

        $response->assertSessionHasErrors(['name']);
    }

    /**
     * Creating category with existing name creates a unique slug.
     */
    public function test_duplicate_name_generates_unique_slug(): void
    {
        $user = User::factory()->create();
        Category::create([
            'name' => 'Kegiatan',
            'slug' => 'kegiatan',
        ]);

        $this->actingAs($user)->post('/admin/categories', [
            'name' => 'Kegiatan',
        ]);

        $this->assertDatabaseHas('categories', [
            'slug' => 'kegiatan-1',
        ]);
    }

    /**
     * Authenticated user can update category.
     */
    public function test_authenticated_user_can_update_category(): void
    {
        $user = User::factory()->create();
        $category = Category::create([
            'name' => 'Kesiswaan Lama',
            'slug' => 'kesiswaan-lama',
        ]);

        $response = $this->actingAs($user)->put("/admin/categories/{$category->id}", [
            'name' => 'Kesiswaan Baru',
            'description' => 'Deskripsi diperbarui',
            'is_active' => true,
            'sort_order' => 2,
        ]);

        $response->assertRedirect('/admin/categories');
        $response->assertSessionHas('success');

        $this->assertDatabaseHas('categories', [
            'id' => $category->id,
            'name' => 'Kesiswaan Baru',
            'slug' => 'kesiswaan-baru',
        ]);
    }

    /**
     * Category referenced by news cannot be deleted.
     */
    public function test_category_referenced_by_news_cannot_be_deleted(): void
    {
        $user = User::factory()->create();
        $category = Category::create([
            'name' => 'Berita Utama',
            'slug' => 'berita-utama',
        ]);

        News::create([
            'category_id' => $category->id,
            'author_id' => $user->id,
            'title' => 'Judul Berita Terkait',
            'slug' => 'judul-berita-terkait',
            'content' => 'Konten berita...',
            'status' => 'published',
            'published_at' => now(),
        ]);

        $response = $this->actingAs($user)->delete("/admin/categories/{$category->id}");

        $response->assertSessionHas('error');
        $this->assertDatabaseHas('categories', ['id' => $category->id]);
    }

    /**
     * Unreferenced category can be deleted.
     */
    public function test_unreferenced_category_can_be_deleted(): void
    {
        $user = User::factory()->create();
        $category = Category::create([
            'name' => 'Kategori Kosong',
            'slug' => 'kategori-kosong',
        ]);

        $response = $this->actingAs($user)->delete("/admin/categories/{$category->id}");

        $response->assertRedirect('/admin/categories');
        $response->assertSessionHas('success');
        $this->assertDatabaseMissing('categories', ['id' => $category->id]);
    }
}
