document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("blogs-container");
  const spinner = document.getElementById("blogs-spinner");
  const section = document.getElementById("blogs");

  fetch("/api/blogs/")
    .then((response) => response.json())
    .then((data) => {
      spinner.style.display = "none";

      if (!data.blogs || data.blogs.length === 0) {
        section.style.display = "none";
        return;
      }

      data.blogs.forEach((blog) => {
        const card = `
                <a href="/blog_details/${blog.slug}/" class="blog-card group relative rounded-3xl overflow-hidden flex flex-col"
                    style="background: white; box-shadow: 0 8px 30px rgba(26,77,46,0.10); min-height: 480px;">
                    
                    <div class="relative overflow-hidden h-56">
                        <img src="${blog.image}" alt="${blog.title}"
                            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                        
                        <div class="absolute inset-0"
                            style="background: linear-gradient(to top, rgba(13,40,24,0.5), transparent);"></div>

                        <span class="absolute top-4 left-4 text-xs font-bold uppercase px-3 py-1 rounded-full"
                            style="background: #c9a227; color: #0d2818;">
                            ${blog.about}
                        </span>
                    </div>

                    <div class="flex flex-col flex-1 p-7">

                        <div class="flex items-center gap-3 mb-4">
                            <span class="text-xs" style="color: #3d5a46;">${blog.date}</span>
                            <span class="w-1 h-1 rounded-full" style="background: #c9a227;"></span>
                            <span class="text-xs" style="color: #3d5a46;">${blog.read_time}</span>
                        </div>

                        <h3 class="text-xl font-bold mb-3" style="color: #0d2818;">
                            ${blog.title}
                        </h3>

                        <p class="text-sm mb-6 flex-1" style="color: #3d5a46;">
                            ${blog.excerpt}
                        </p>

                        <div class="flex items-center gap-3 pt-4" style="border-top: 1px solid rgba(26,77,46,0.08);">
                        <div class="w-8 h-8 rounded-full overflow-hidden flex-shrink-0"
                            style="background: rgba(26,77,46,0.12);">
                            <img src="/static/images/blogs/author.png" alt="${blog.author}"
                                class="w-full h-full object-cover" onerror="this.style.display='none'">
                        </div>
                        <span class="text-xs font-semibold" style="color: #1a4d2e;">${blog.author}</span>
                        <span class="ml-auto">
                            <svg class="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                                viewBox="0 0 24 24" fill="none" stroke="#1a4d2e" stroke-width="2">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </span>
                    </div>
                    </div>
                </a>
                `;

        container.innerHTML += card;
      });
    })
    .catch((error) => {
      console.error("Error:", error);
      spinner.style.display = "none";
      section.style.display = "none";
    });
});
