from django.contrib import admin
from .models import LegacyPortfolio
from .models import CulturalImmersions


@admin.register(LegacyPortfolio)
class LegacyPortfolioAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "price",
        "currency",
        "is_featured",
        "is_active",
        "created_at",
    )
    list_filter = ("is_featured", "is_active", "created_at")
    search_fields = ("title", "tags", "includes")
    prepopulated_fields = {"slug": ("title",)}
    readonly_fields = ("created_at", "updated_at")
    ordering = ("-created_at",)


@admin.register(CulturalImmersions)
class CulturalImmersionsAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "season",
        "currency",
        "price",
        "is_featured",
        "is_active",
        "created_at",
    )

    list_filter = (
        "is_active",
        "is_featured",
        "currency",
        "created_at",
    )

    search_fields = (
        "title",
        "season",
        "community_impact",
        "includes",
    )

    prepopulated_fields = {
        "slug": ("title",)
    }

    readonly_fields = (
        "created_at",
        "updated_at",
    )

    ordering = ("-created_at",)


from django.contrib import admin
from django.utils.html import format_html
from django.utils import timezone
from .models import Blog

# ── Blog Admin ───────────────────────────────────────────────

class BlogStatusFilter(admin.SimpleListFilter):
    """Custom filter with post counts next to each status."""
    title = 'Status'
    parameter_name = 'status'

    def lookups(self, request, model_admin):
        draft_count     = Blog.objects.filter(status='draft').count()
        published_count = Blog.objects.filter(status='published').count()
        return [
            ('draft',     f'Draft ({draft_count})'),
            ('published', f'Published ({published_count})'),
        ]

    def queryset(self, request, queryset):
        if self.value():
            return queryset.filter(status=self.value())
        return queryset


@admin.register(Blog)
class BlogAdmin(admin.ModelAdmin):

    # ── List view ──
    list_display = (
        'cover_thumbnail',
        'title',
        'author',
        'status_badge',
        'is_featured',
        'read_time_display',
        'published_at',
        'updated_at',
    )
    list_display_links = ('cover_thumbnail', 'title')
    list_filter        = (BlogStatusFilter, 'is_featured', 'author')
    search_fields      = ('title', 'excerpt', 'body')
    list_editable      = ('is_featured',)
    date_hierarchy     = 'published_at'
    ordering           = ('-created_at',)
    list_per_page      = 20

    # ── Actions ──
    actions = ['make_published', 'make_draft', 'mark_featured', 'unmark_featured']

    # ── Form layout ──
    prepopulated_fields = {'slug': ('title',)}
    readonly_fields     = ('created_at', 'updated_at', 'published_at', 'cover_preview', 'read_time_display')

    # ── Custom list columns ──

    def cover_thumbnail(self, obj):
        if obj.cover_image:
            return format_html(
                '<img src="{}" style="width:64px; height:44px; object-fit:cover; '
                'border-radius:6px; border:1px solid #e0e0e0;" />',
                obj.cover_image.url
            )
        return format_html(
            '<div style="width:64px; height:44px; border-radius:6px; '
            'background:#f0ebe0; display:flex; align-items:center; '
            'justify-content:center; font-size:18px;">🌿</div>'
        )
    cover_thumbnail.short_description = ''

    def status_badge(self, obj):
        styles = {
            'published': 'background:#e6f4ea; color:#1a7d3a; border:1px solid #b7dfbf;',
            'draft':     'background:#fff8e1; color:#a07c00; border:1px solid #ffe082;',
        }
        labels = {
            'published': '● Published',
            'draft':     '○ Draft',
        }
        style = styles.get(obj.status, '')
        label = labels.get(obj.status, obj.status)
        return format_html(
            '<span style="{}; padding:3px 10px; border-radius:20px; '
            'font-size:12px; font-weight:600; white-space:nowrap;">{}</span>',
            style, label
        )
    status_badge.short_description = 'Status'

    def read_time_display(self, obj):
        return obj.read_time
    read_time_display.short_description = 'Read Time'

    def cover_preview(self, obj):
        if obj.cover_image:
            return format_html(
                '<img src="{}" style="max-width:420px; max-height:240px; '
                'object-fit:cover; border-radius:10px; margin-top:6px;" />',
                obj.cover_image.url
            )
        return '—'
    cover_preview.short_description = 'Preview'

    # ── Bulk actions ──

    @admin.action(description='✅ Publish selected posts')
    def make_published(self, request, queryset):
        updated = queryset.filter(status='draft').update(
            status='published',
            published_at=timezone.now()
        )
        self.message_user(request, f'{updated} post(s) published.')

    @admin.action(description='📝 Revert selected posts to Draft')
    def make_draft(self, request, queryset):
        updated = queryset.update(status='draft')
        self.message_user(request, f'{updated} post(s) moved to draft.')

    @admin.action(description='⭐ Mark selected as Featured')
    def mark_featured(self, request, queryset):
        queryset.update(is_featured=True)
        self.message_user(request, 'Selected posts marked as featured.')

    @admin.action(description='☆ Remove Featured from selected')
    def unmark_featured(self, request, queryset):
        queryset.update(is_featured=False)
        self.message_user(request, 'Featured flag removed.')