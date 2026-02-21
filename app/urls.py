from django.urls import path
# from django.contrib.sitemaps.views import sitemap
# from app.sitemap import StaticSitemap
from . import views


urlpatterns = [
    path('', views.Index, name='index'),
    path('about/', views.About, name='about'),
    path('contact/', views.Contact, name='contact'),
    path('akiba_safaris/', views.AkibaSafaris, name='akiba_safaris'),
    path('legacy_portfolio/', views.legacyPortfolio, name='legacy_portfolio'),
    # path('WRC_Safari_Rally/', views.Safari, name='safari'),
    path('Mombasa_Port_to_Tsavo', views.Mombasa, name='mombasa'),
    path('manifesto/', views.Manifesto, name='manifesto'),
    path('api/latest-legacy/', views.latest_legacy_portfolio, name='latest_legacy_portfolio'),
    path("legacy/<slug:slug>/", views.legacy_portfolio_detail, name="legacy_portfolio_detail"),

]