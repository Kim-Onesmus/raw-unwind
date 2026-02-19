from django.contrib import admin
from .models import LegacyPortfolio

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
