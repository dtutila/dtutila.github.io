(function () {
  var theme = "dark";

  try {
    var storedTheme = localStorage.getItem("theme");
    if (storedTheme === "light" || storedTheme === "dark") {
      theme = storedTheme;
    } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) {
      theme = "light";
    }
  } catch (_) {
    // Storage can be unavailable in private browsing; the default still works.
  }

  document.documentElement.classList.add(theme);
  document.documentElement.style.colorScheme = theme;
  document.querySelector('meta[name="theme-color"]').setAttribute("content", theme === "dark" ? "#1a1b26" : "#fbf1c7");
})();
