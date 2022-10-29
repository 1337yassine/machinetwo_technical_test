using Microsoft.AspNetCore.Mvc;

namespace technical_test_api_presentation.Controllers
{
    public class NoteController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
