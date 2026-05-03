// Main App — routing, state, tweaks
const { useState: uSA, useEffect: uEA } = React;

function App() {
  const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "primaryColor": "#0F5B5B",
    "fontFamily": "Tajawal",
    "theme": "light",
    "language": "ar",
    "density": "comfortable"
  }/*EDITMODE-END*/;

  const [values, setTweak] = window.useTweaks ? window.useTweaks(TWEAK_DEFAULTS) : [TWEAK_DEFAULTS, () => {}];
  const { primaryColor, fontFamily, theme, language: lang, density } = values;

  const [page, setPage] = uSA("home");
  const [pageArg, setPageArg] = uSA(null);
  const [cart, setCart] = uSA([]);

  const onNav = (p, arg = null) => {
    setPage(p);
    setPageArg(arg);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onAddCart = (id, qty = 1) => {
    setCart(prev => {
      const ex = prev.find(c => c.id === id);
      if (ex) return prev.map(c => c.id === id ? { ...c, qty: c.qty + qty } : c);
      return [...prev, { id, qty }];
    });
  };
  const cartCount = cart.reduce((s, c) => s + c.qty, 0);

  uEA(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    root.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
    root.setAttribute("lang", lang);
    root.setAttribute("data-density", density);
    root.style.setProperty("--primary", primaryColor);
    root.style.setProperty("--font-display", `"${fontFamily}", system-ui, sans-serif`);
    document.body.style.fontFamily = lang === "ar"
      ? `"${fontFamily}", "Tajawal", system-ui, sans-serif`
      : `"Manrope", system-ui, sans-serif`;
  }, [theme, lang, primaryColor, fontFamily, density]);

  let content = null;
  if (page === "home") content = <HomePage lang={lang} onNav={onNav} onAddCart={onAddCart} onOpenProduct={(id) => onNav("product", id)} />;
  else if (page === "shop") content = <ShopPage lang={lang} onAddCart={onAddCart} onOpenProduct={(id) => onNav("product", id)} />;
  else if (page === "product") content = <ProductPage id={pageArg} lang={lang} onAddCart={onAddCart} onNav={onNav} />;
  else if (page === "calculator") content = <CalculatorPage lang={lang} onNav={onNav} />;
  else if (page === "blog") content = <BlogPage lang={lang} onNav={onNav} />;
  else if (page === "post") content = <PostPage id={pageArg} lang={lang} onNav={onNav} />;
  else if (page === "about") content = <AboutPage lang={lang} onNav={onNav} />;
  else if (page === "contact") content = <ContactPage lang={lang} />;

  return (
    <>
      <Header
        page={page}
        onNav={onNav}
        lang={lang}
        onToggleLang={() => setTweak("language", lang === "ar" ? "en" : "ar")}
        theme={theme}
        onToggleTheme={() => setTweak("theme", theme === "dark" ? "light" : "dark")}
        cartCount={cartCount}
      />
      <main key={page + (pageArg || "")}>{content}</main>
      <Footer lang={lang} onNav={onNav} />

      {window.TweaksPanel && (
        <window.TweaksPanel title={lang === "ar" ? "إعدادات التصميم" : "Tweaks"}>
          <window.TweakSection title={lang === "ar" ? "الألوان" : "Colors"}>
            <window.TweakColor label={lang === "ar" ? "اللون الرئيسي" : "Primary"} value={primaryColor} onChange={(v) => setTweak("primaryColor", v)} />
            <window.TweakRadio label={lang === "ar" ? "الوضع" : "Mode"} value={theme}
              options={[{ value: "light", label: lang === "ar" ? "فاتح" : "Light" }, { value: "dark", label: lang === "ar" ? "داكن" : "Dark" }]}
              onChange={(v) => setTweak("theme", v)} />
          </window.TweakSection>
          <window.TweakSection title={lang === "ar" ? "الخط" : "Type"}>
            <window.TweakSelect label={lang === "ar" ? "نوع الخط" : "Font family"} value={fontFamily}
              options={[
                { value: "Tajawal", label: "Tajawal" },
                { value: "Cairo", label: "Cairo" },
                { value: "Noto Kufi Arabic", label: "Noto Kufi" },
                { value: "Almarai", label: "Almarai" },
                { value: "IBM Plex Sans Arabic", label: "IBM Plex Arabic" },
              ]}
              onChange={(v) => setTweak("fontFamily", v)} />
          </window.TweakSection>
          <window.TweakSection title={lang === "ar" ? "اللغة والكثافة" : "Language & density"}>
            <window.TweakRadio label={lang === "ar" ? "اللغة" : "Language"} value={lang}
              options={[{ value: "ar", label: "العربية" }, { value: "en", label: "English" }]}
              onChange={(v) => setTweak("language", v)} />
            <window.TweakRadio label={lang === "ar" ? "الكثافة" : "Density"} value={density}
              options={[{ value: "comfortable", label: lang === "ar" ? "مريح" : "Comfy" }, { value: "compact", label: lang === "ar" ? "مدمج" : "Compact" }]}
              onChange={(v) => setTweak("density", v)} />
          </window.TweakSection>
        </window.TweaksPanel>
      )}
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
