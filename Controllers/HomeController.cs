using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using System.Threading.Tasks;

namespace Tob.Controllers
{
    public class HomeController : Controller
    {
        private readonly IWebHostEnvironment _environment;

        public HomeController(IWebHostEnvironment environment)
        {
            _environment = environment;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Upload(IFormFile uploadedImage)
        {
            if (uploadedImage != null && uploadedImage.Length > 0)
            {
                var uploadsFolder = Path.Combine(_environment.WebRootPath, "uploads");
                Directory.CreateDirectory(uploadsFolder);  // Ensure the folder exists

                var filePath = Path.Combine(uploadsFolder, uploadedImage.FileName);
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await uploadedImage.CopyToAsync(fileStream);
                }

                ViewData["Message"] = "Image uploaded successfully!";
            }

            return View("Index");
        }
    }
}
