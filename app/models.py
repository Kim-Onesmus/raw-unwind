from django.db import models
import uuid
import os
from django.db import models
from django.utils.text import slugify
from ckeditor_uploader.fields import RichTextUploadingField

# Create your models here.

def upload_image_to(instance, filename):
    name = getattr(instance, 'slug', None) or slugify(getattr(instance, 'title', 'image'))
    name = name[:40]
    ext = filename.split('.')[-1]
    folder = instance.__class__.__name__.lower()
    return f"{folder}/images/{name}.{ext}"


class LegacyPortfolio(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255)
    currency = models.CharField(max_length=10, default="USD, KES")

    price = models.CharField(help_text="Price per person")
    date = models.DateField(null=True, blank=True)
    duration_days = models.PositiveIntegerField(default=0)
    duration_nights = models.PositiveIntegerField(default=0)
    duration_hours = models.PositiveIntegerField(default=0)
    includes = models.TextField(help_text="Hot air balloon included")
    tags = models.CharField(max_length=255, help_text="Ultimate Safari or Cruise Exclusive")

    slug = models.SlugField(unique=True, blank=True, max_length=255)
    main_image = models.ImageField(upload_to=upload_image_to)
    content = RichTextUploadingField()

    is_featured = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
    class Meta:
        verbose_name_plural = "LegacyPortfolio"


class CulturalImmersions(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255)
    currency = models.CharField(max_length=10, default="USD")

    price = models.CharField(help_text="Price per person")
    season = models.CharField(max_length=255, help_text="eg. July - October")
    community_impact = models.CharField(max_length=255, help_text="Supports Swahili artisan cooperatives and heritage preservation")
    includes = models.TextField(help_text="6 days, luxury mobile camp, Maasai cultural immersion")

    slug = models.SlugField(unique=True, blank=True, max_length=255)
    main_image = models.ImageField(upload_to=upload_image_to)
    content = RichTextUploadingField()

    is_featured = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
    class Meta:
        verbose_name_plural = "CulturalImmersion"