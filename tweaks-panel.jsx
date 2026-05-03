// Calculator + Blog + Post + About + Contact
const { useState: uS2, useMemo: uM2 } = React;

function CalculatorPage({ lang, onNav }) {
  const isAr = lang === "ar";
  const [hours, setHours] = uS2({}); // { applianceId: { qty, hrs } }
  const [autonomy, setAutonomy] = uS2(2); // hours of battery backup

  const setQty = (id, qty) => setHours(p => ({ ...p, [id]: { hrs: 4, ...p[id], qty: Math.max(0, qty) } }));
  const setHrs = (id, hrs) => setHours(p => ({ ...p, [id]: { qty: 1, ...p[id], hrs: Math.max(0, hrs) } }));

  const calc = uM2(() => {
    let totalW = 0;
    let totalWh = 0;
    window.CP_DATA.APPLIANCES.forEach(a => {
      const e = hours[a.id];
      if (!e || !e.qty || !e.hrs) return;
      totalW += a.watts * e.qty;
      totalWh += a.watts * e.qty * e.hrs;
    });
    const peakKw = totalW / 1000;
    const dayKwh = totalWh / 1000;

    // Inverter: 1.25x peak load, round up to 3/5/6/8/10
    const invSizes = [3, 5, 6, 8, 10, 12];
    const invKw = invSizes.find(x => x >= peakKw * 1.25) || (Math.ceil(peakKw * 1.25));

    // Panels: assume 5 sun-hours, 80% efficiency, then count of 550W panels
    const panelW = (dayKwh * 1000) / (5 * 0.8);
    const panelCount = Math.max(2, Math.ceil(panelW / 550));

    // Battery: cover autonomy hours of average load, LiFePO4 80% DoD
    const batteryKwh = (peakKw * autonomy) / 0.8;
    const batteryUnits = Math.max(1, Math.ceil(batteryKwh / 5.12));

    return { peakKw, dayKwh, invKw, panelCount, batteryKwh, batteryUnits };
  }, [hours, autonomy]);

  const fmt = (n, d = 1) => {
    const s = n.toFixed(d);
    return isAr ? s.replace(/\d/g, c => "٠١٢٣٤٥٦٧٨٩"[c]) : s;
  };
  const hasItems = calc.peakKw > 0;

  return (
    <div className="page-enter">
      <section style={{ padding: "60px 0 30px", borderBottom: "1px solid var(--border)" }}>
        <div className="container">
          <span className="eyebrow">{isAr ? "أداة تفاعلية" : "Interactive tool"}</span>
          <h1 className="display-2" style={{ marginTop: 14, maxWidth: 800 }}>
            {isAr ? "احسب احتياج منزلك من الطاقة الشمسية." : "Size your home solar system."}
          </h1>
          <p style={{ marginTop: 14, color: "var(--fg-muted)", fontSize: 17, maxWidth: 700 }}>
            {isAr
              ? "اختر أجهزتك المنزلية، حدّد عددها وساعات تشغيلها يومياً، وسنقترح عليك حجم الإنفرتر، عدد الألواح، وعدد البطاريات المناسب."
              : "Select your appliances, set quantity and daily run-hours, and we'll recommend inverter size, panel count, and battery units."}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="calc-shell">
            <div className="calc-form">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                <h3 className="h3">{isAr ? "أجهزتك المنزلية" : "Your appliances"}</h3>
                <span className="mono" style={{ fontSize: 11, color: "var(--fg-subtle)", letterSpacing: "0.1em" }}>
                  STEP 01 / 02
                </span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1.5fr 0.7fr 0.7fr", gap: 12, paddingBottom: 8, borderBottom: "1px solid var(--border-strong)" }}>
                <span className="mono" style={{ fontSize: 11, color: "var(--fg-subtle)", letterSpacing: "0.1em" }}>{isAr ? "الجهاز" : "APPLIANCE"}</span>
                <span className="mono" style={{ fontSize: 11, color: "var(--fg-subtle)", letterSpacing: "0.1em", textAlign: "center" }}>{isAr ? "العدد" : "QTY"}</span>
                <span className="mono" style={{ fontSize: 11, color: "var(--fg-subtle)", letterSpacing: "0.1em", textAlign: "center" }}>{isAr ? "ساعات/يوم" : "HRS/DAY"}</span>
              </div>
              {window.CP_DATA.APPLIANCES.map(a => {
                const e = hours[a.id] || { qty: 0, hrs: 0 };
                return (
                  <div key={a.id} className="appliance-row" style={{ gridTemplateColumns: "1.5fr 0.7fr 0.7fr" }}>
                    <div className="appliance-name">
                      <span className="appliance-icon"><Icon name={a.icon} size={20} stroke={1.4} /></span>
                      <div>
                        <div>{isAr ? a.ar : a.en}</div>
                        <div className="appliance-watt">{a.watts} W</div>
                      </div>
                    </div>
                    <div className="num-input">
                      <button onClick={() => setQty(a.id, (e.qty || 0) - 1)}><Icon name="minus" size={12} /></button>
                      <input value={e.qty || 0} onChange={(ev) => setQty(a.id, parseInt(ev.target.value) || 0)} />
                      <button onClick={() => setQty(a.id, (e.qty || 0) + 1)}><Icon name="plus" size={12} /></button>
                    </div>
                    <div className="num-input">
                      <button onClick={() => setHrs(a.id, (e.hrs || 0) - 1)}><Icon name="minus" size={12} /></button>
                      <input value={e.hrs || 0} onChange={(ev) => setHrs(a.id, parseInt(ev.target.value) || 0)} />
                      <button onClick={() => setHrs(a.id, (e.hrs || 0) + 1)}><Icon name="plus" size={12} /></button>
                    </div>
                  </div>
                );
              })}

              <div style={{ marginTop: 32, paddingTop: 24, borderTop: "1px solid var(--border)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <h4 style={{ fontSize: 14, fontWeight: 700 }}>{isAr ? "ساعات الاحتياطي عند انقطاع الشمس" : "Backup hours (no sun)"}</h4>
                  <span className="mono" style={{ fontSize: 14, fontWeight: 700, color: "var(--primary)" }}>{autonomy}h</span>
                </div>
                <input type="range" min="1" max="6" value={autonomy} onChange={(e) => setAutonomy(parseInt(e.target.value))}
                  style={{ width: "100%", accentColor: "var(--primary)" }}/>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontSize: 11, color: "var(--fg-subtle)", fontFamily: "var(--font-mono)" }}>
                  <span>1H</span><span>6H</span>
                </div>
              </div>
            </div>

            <div className="calc-result">
              <div className="calc-result-grid"></div>
              <div style={{ position: "relative" }}>
                <span className="mono" style={{ fontSize: 11, letterSpacing: "0.15em", opacity: 0.5 }}>
                  STEP 02 / 02 — {isAr ? "النتيجة" : "RESULT"}
                </span>
                <h3 style={{ fontSize: 28, fontWeight: 700, marginTop: 8, marginBottom: 24, lineHeight: 1.2 }}>
                  {isAr ? "النظام الموصى به" : "Recommended system"}
                </h3>

                {!hasItems ? (
                  <div style={{ padding: "60px 0", textAlign: "center", opacity: 0.6 }}>
                    <Icon name="bolt" size={48} stroke={1.2} />
                    <p style={{ marginTop: 16, fontSize: 14 }}>
                      {isAr ? "ابدأ بإضافة أجهزتك على اليمين لرؤية التوصية" : "Add appliances on the left to see your recommendation"}
                    </p>
                  </div>
                ) : (
                  <>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
                      <div style={{ padding: 18, background: "rgba(255,255,255,0.04)", borderRadius: "var(--radius)", border: "1px solid rgba(255,255,255,0.1)" }}>
                        <div className="mono" style={{ fontSize: 11, opacity: 0.6, letterSpacing: "0.15em" }}>{isAr ? "أعلى حمل" : "PEAK LOAD"}</div>
                        <div className="mono" style={{ fontSize: 28, fontWeight: 600, marginTop: 4 }}>{fmt(calc.peakKw, 2)} <span style={{ fontSize: 14, opacity: 0.6 }}>kW</span></div>
                      </div>
                      <div style={{ padding: 18, background: "rgba(255,255,255,0.04)", borderRadius: "var(--radius)", border: "1px solid rgba(255,255,255,0.1)" }}>
                        <div className="mono" style={{ fontSize: 11, opacity: 0.6, letterSpacing: "0.15em" }}>{isAr ? "استهلاك يومي" : "DAILY USAGE"}</div>
                        <div className="mono" style={{ fontSize: 28, fontWeight: 600, marginTop: 4 }}>{fmt(calc.dayKwh, 1)} <span style={{ fontSize: 14, opacity: 0.6 }}>kWh</span></div>
                      </div>
                    </div>

                    <div style={{ display: "grid", gap: 12 }}>
                      <RecRow icon="inverter" label={isAr ? "محوّل (إنفرتر)" : "Inverter"} value={`${calc.invKw} kW`} sub={isAr ? "هجين Deye / Felicity" : "Hybrid Deye / Felicity"} />
                      <RecRow icon="panel" label={isAr ? "ألواح JA Solar 550W" : "JA Solar 550W panels"} value={`× ${calc.panelCount}`} sub={`${(calc.panelCount * 550 / 1000).toFixed(2)} kWp`} />
                      <RecRow icon="battery" label={isAr ? "بطارية ليثيوم 5.12kWh" : "Lithium 5.12kWh battery"} value={`× ${calc.batteryUnits}`} sub={`${fmt(calc.batteryUnits * 5.12, 2)} kWh`} />
                    </div>

                    <div style={{ marginTop: 28, display: "flex", gap: 10, flexWrap: "wrap" }}>
                      <button className="btn btn-accent" onClick={() => onNav("contact")}>
                        {isAr ? "اطلب عرض سعر" : "Request quote"} <span className="arrow">→</span>
                      </button>
                      <button className="btn btn-ghost" style={{ borderColor: "rgba(255,255,255,0.3)", color: "white" }} onClick={() => onNav("shop")}>
                        {isAr ? "تسوّق المنتجات" : "Shop parts"}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <p style={{ textAlign: "center", marginTop: 24, fontSize: 13, color: "var(--fg-subtle)" }}>
            {isAr
              ? "* تقدير تقريبي — الحجم النهائي يحدد بعد المعاينة الفعلية لمنزلك."
              : "* Approximate estimate — final sizing confirmed after on-site survey."}
          </p>
        </div>
      </section>
    </div>
  );
}

function RecRow({ icon, label, value, sub }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 16, alignItems: "center", padding: "16px 18px", background: "rgba(255,255,255,0.04)", borderRadius: "var(--radius)", border: "1px solid rgba(255,255,255,0.1)" }}>
      <div style={{ width: 42, height: 42, borderRadius: 10, background: "var(--accent)", color: "var(--ink-900)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon name={icon} size={20} stroke={1.5} />
      </div>
      <div>
        <div style={{ fontSize: 14, fontWeight: 600 }}>{label}</div>
        <div className="mono" style={{ fontSize: 12, opacity: 0.6, marginTop: 2 }}>{sub}</div>
      </div>
      <div className="mono" style={{ fontSize: 22, fontWeight: 700, color: "var(--accent)" }}>{value}</div>
    </div>
  );
}

// ---------- BLOG LIST ----------
function BlogPage({ lang, onNav }) {
  const isAr = lang === "ar";
  const featured = window.CP_DATA.POSTS[0];
  const rest = window.CP_DATA.POSTS.slice(1);
  return (
    <div className="page-enter">
      <section style={{ padding: "60px 0 30px", borderBottom: "1px solid var(--border)" }}>
        <div className="container">
          <span className="eyebrow">{isAr ? "المدوّنة" : "Journal"}</span>
          <h1 className="display-2" style={{ marginTop: 14 }}>
            {isAr ? "مقالات هندسية وإرشادات عملية." : "Engineering articles & practical guides."}
          </h1>
        </div>
      </section>

      {/* Featured post */}
      <section className="section">
        <div className="container">
          <article style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 50, alignItems: "center", cursor: "pointer" }}
            onClick={() => onNav("post", featured.id)}>
            <div style={{ aspectRatio: "4/3", borderRadius: "var(--radius-xl)", border: "1px solid var(--border)", background: "var(--bg-2)", position: "relative", overflow: "hidden" }}>
              <div className="ph">
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
                  <Icon name="panel" size={64} stroke={1} />
                  <span style={{ fontSize: 11, opacity: 0.6 }}>FEATURED ARTICLE / 01</span>
                </div>
              </div>
            </div>
            <div>
              <span className="chip" style={{ marginBottom: 16 }}>{isAr ? "مقال مميّز" : "Featured"}</span>
              <h2 className="display-2" style={{ marginTop: 0, marginBottom: 18, fontSize: "clamp(28px, 3vw, 44px)" }}>
                {isAr ? featured.ar.title : featured.en.title}
              </h2>
              <p style={{ color: "var(--fg-muted)", fontSize: 17, lineHeight: 1.7, marginBottom: 24 }}>
                {isAr ? featured.ar.excerpt : featured.en.excerpt}
              </p>
              <div className="blog-meta" style={{ marginBottom: 28 }}>
                <span>{isAr ? featured.cat.ar : featured.cat.en}</span>
                <span>{featured.date}</span>
                <span>{isAr ? featured.read : featured.readEn}</span>
              </div>
              <button className="btn btn-primary">{isAr ? "اقرأ المقال" : "Read article"} <span className="arrow">→</span></button>
            </div>
          </article>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head">
            <div className="section-head-text">
              <span className="eyebrow">{isAr ? "كل المقالات" : "All articles"}</span>
              <h2 className="h2" style={{ marginTop: 14 }}>{isAr ? "تابع آخر ما نكتب" : "Latest writing"}</h2>
            </div>
          </div>
          <div className="blog-grid">
            {rest.map(p => (
              <article key={p.id} className="blog-card" onClick={() => onNav("post", p.id)}>
                <div className="blog-thumb">
                  <div className="ph"><Icon name={p.id.includes("battery") ? "battery" : p.id.includes("deye") ? "inverter" : p.id.includes("sizing") ? "calc" : p.id.includes("maint") ? "tools" : "bolt"} size={42} stroke={1.2} /></div>
                </div>
                <div className="blog-meta">
                  <span>{isAr ? p.cat.ar : p.cat.en}</span>
                  <span>{p.date}</span>
                </div>
                <h3 className="blog-title">{isAr ? p.ar.title : p.en.title}</h3>
                <p className="blog-excerpt">{isAr ? p.ar.excerpt : p.en.excerpt}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ---------- POST DETAIL ----------
function PostPage({ id, lang, onNav }) {
  const isAr = lang === "ar";
  const p = window.CP_DATA.POSTS.find(x => x.id === id) || window.CP_DATA.POSTS[0];
  const txt = isAr ? p.ar : p.en;

  const bodyAr = [
    { type: "p", text: "في السودان، الشمس مورد لا ينضب. لكنّ السؤال الحقيقي ليس \"هل الطاقة الشمسية مناسبة؟\" بل \"كيف أختار النظام الذي يخدمني فعلاً؟\". في هذا المقال نأخذك خطوة بخطوة عبر الاعتبارات الهندسية الأساسية." },
    { type: "h2", text: "أولاً: فهم احتياجك" },
    { type: "p", text: "قبل اختيار أي مكوّن، احسب استهلاكك اليومي. اجمع قدرة كل جهاز (واط) مضروبة في عدد ساعات تشغيله. هذا يعطيك الكيلوواط ساعة (kWh) المطلوبة يومياً." },
    { type: "quote", text: "النظام الجيد يبدأ من حساب دقيق، لا من تخمين." },
    { type: "h2", text: "ثانياً: اختيار الإنفرتر المناسب" },
    { type: "p", text: "الإنفرتر هو قلب النظام. اختر دائماً قدرة أعلى من ذروة استهلاكك بنسبة ٢٥٪. الإنفرترات الهجينة (Hybrid) مثل Deye و Felicity هي الأفضل لمنازل السودان لأنها تدمج الشبكة العامة، الشمس، والبطاريات." },
    { type: "h2", text: "ثالثاً: الألواح الشمسية" },
    { type: "p", text: "ألواح JA Solar من فئة Mono PERC تقدّم كفاءة تصل إلى ٢١٪ وأداءً ممتازاً في الحرارة العالية، وهو ما يجعلها مثالية للسودان. اختر القدرة بحيث تنتج يومياً ١.٢ ضعف استهلاكك على الأقل." },
    { type: "h2", text: "رابعاً: البطاريات" },
    { type: "p", text: "بطاريات الليثيوم (LiFePO4) تتفوّق على الجل في كل شيء تقريباً: عمر أطول، عمق تفريغ أعلى (٨٠٪ بدل ٥٠٪)، وحجم أصغر. لكنها أغلى. إذا كانت ميزانيتك محدودة، بطاريات NPP الجل خيار موثوق." },
    { type: "h2", text: "خلاصة" },
    { type: "p", text: "لا يوجد \"نظام واحد يناسب الجميع\". استخدم حاسبة الطاقة على موقعنا، ثم تواصل مع فريقنا لمعاينة منزلك ونقدّم لك عرضاً مخصّصاً." },
  ];
  const bodyEn = [
    { type: "p", text: "In Sudan, sunlight is a resource that never runs out. But the real question isn't \"is solar right for me?\" — it's \"how do I pick a system that actually serves me?\". This article walks you through the core engineering considerations." },
    { type: "h2", text: "Step 1: Understand your load" },
    { type: "p", text: "Before choosing any component, calculate daily usage. Sum each appliance's wattage × run-hours. That gives you the kWh you need per day." },
    { type: "quote", text: "A great system starts with a precise calculation — not a guess." },
    { type: "h2", text: "Step 2: Picking the inverter" },
    { type: "p", text: "The inverter is the heart of the system. Always pick capacity 25% above your peak load. Hybrid inverters like Deye and Felicity are best for Sudanese homes because they combine grid, solar, and batteries." },
    { type: "h2", text: "Step 3: Solar panels" },
    { type: "p", text: "Mono PERC panels from JA Solar deliver up to 21% efficiency and excellent heat performance — perfect for Sudan. Size them to produce 1.2× your daily usage at minimum." },
    { type: "h2", text: "Step 4: Batteries" },
    { type: "p", text: "Lithium (LiFePO4) beats gel on almost everything: longer life, higher depth-of-discharge (80% vs 50%), smaller size. They cost more though. On a budget, NPP gel is a solid choice." },
    { type: "h2", text: "Wrap-up" },
    { type: "p", text: "There's no one-size-fits-all. Use our energy calculator, then talk to our team — we'll do an on-site survey and give you a custom quote." },
  ];
  const body = isAr ? bodyAr : bodyEn;

  return (
    <div className="page-enter">
      <article>
        <header style={{ padding: "60px 0 50px", borderBottom: "1px solid var(--border)" }}>
          <div className="container-narrow" style={{ textAlign: "center" }}>
            <span className="chip">{isAr ? p.cat.ar : p.cat.en}</span>
            <h1 className="display-2" style={{ marginTop: 22, marginBottom: 22 }}>{txt.title}</h1>
            <div className="blog-meta" style={{ justifyContent: "center" }}>
              <span>{p.date}</span>
              <span>{isAr ? p.read : p.readEn}</span>
              <span>CITY POWER</span>
            </div>
          </div>
        </header>

        <div className="container-narrow" style={{ padding: "0 32px" }}>
          <div style={{ aspectRatio: "16/9", borderRadius: "var(--radius-xl)", background: "var(--bg-2)", border: "1px solid var(--border)", margin: "50px 0", position: "relative", overflow: "hidden" }}>
            <div className="ph">
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
                <Icon name="panel" size={72} stroke={1} />
                <span style={{ fontSize: 11, opacity: 0.6 }}>ARTICLE HERO IMAGE</span>
              </div>
            </div>
          </div>
        </div>

        <div className="container-narrow" style={{ paddingBottom: 100 }}>
          <div style={{ fontSize: 18, lineHeight: 1.85, color: "var(--fg)" }}>
            {body.map((b, i) => {
              if (b.type === "h2") return <h2 key={i} className="h2" style={{ marginTop: 50, marginBottom: 16, fontSize: 28 }}>{b.text}</h2>;
              if (b.type === "quote") return (
                <blockquote key={i} style={{ borderInlineStart: "3px solid var(--primary)", paddingInlineStart: 24, margin: "30px 0", fontSize: 22, fontWeight: 600, fontStyle: "italic", color: "var(--fg)", lineHeight: 1.4 }}>
                  "{b.text}"
                </blockquote>
              );
              return <p key={i} style={{ marginBottom: 18, color: "var(--fg-muted)" }}>{b.text}</p>;
            })}
          </div>

          <div style={{ marginTop: 60, padding: "40px", background: "var(--bg-2)", borderRadius: "var(--radius-xl)", border: "1px solid var(--border)", textAlign: "center" }}>
            <h3 className="h3" style={{ marginBottom: 12 }}>
              {isAr ? "هل تحتاج مساعدة في حساب نظامك؟" : "Need help sizing your system?"}
            </h3>
            <p style={{ color: "var(--fg-muted)", marginBottom: 24, maxWidth: 480, margin: "0 auto 24px" }}>
              {isAr ? "استخدم حاسبة الطاقة المجانية واحصل على توصية فورية." : "Use our free calculator for an instant recommendation."}
            </p>
            <button className="btn btn-primary" onClick={() => onNav("calculator")}>
              {isAr ? "ابدأ الحساب" : "Open the calculator"} <span className="arrow">→</span>
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}

// ---------- ABOUT ----------
function AboutPage({ lang, onNav }) {
  const isAr = lang === "ar";
  return (
    <div className="page-enter">
      <section className="section">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
            <div>
              <span className="eyebrow">{isAr ? "من نحن" : "About us"}</span>
              <h1 className="display-1" style={{ marginTop: 18, fontSize: "clamp(36px, 5vw, 72px)" }}>
                {isAr ? (<>نُهدي السودان<br/><span style={{ color: "var(--primary)" }}>كهرباء بلا انقطاع.</span></>) : (<>Powering Sudan<br/><span style={{ color: "var(--primary)" }}>without interruption.</span></>)}
              </h1>
            </div>
            <div style={{ paddingTop: 50 }}>
              <p style={{ fontSize: 19, lineHeight: 1.75, color: "var(--fg-muted)", marginBottom: 24 }}>
                {isAr
                  ? "ستي باور (City Power) شركة سودانية متخصّصة في تصميم وتركيب أنظمة الطاقة الشمسية للمنازل والمنشآت. نؤمن أن الكهرباء النظيفة حقّ لكل بيت، وأن المعرفة الهندسية الجيدة هي ما يصنع الفرق."
                  : "City Power is a Sudanese company specialized in designing and installing solar systems for homes and businesses. We believe clean power is every household's right — and that good engineering is what makes the difference."}
              </p>
              <p style={{ fontSize: 17, lineHeight: 1.75, color: "var(--fg-muted)" }}>
                {isAr
                  ? "نعمل فقط مع علامات تجارية موثّقة عالمياً (Deye, Felicity, JA Solar, NPP, INVT)، ونقدم ضمانات حقيقية مدعومة بفريق هندسي محلي تستطيع الوصول إليه في أي وقت."
                  : "We work only with internationally trusted brands (Deye, Felicity, JA Solar, NPP, INVT), with real warranties backed by a local engineering team you can reach anytime."}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-tight" style={{ background: "var(--ink-900)", color: "white", padding: "80px 0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 40 }}>
            {[
              { num: "+800", label: isAr ? "نظام مُركّب" : "Systems installed" },
              { num: "2024", label: isAr ? "سنة التأسيس" : "Founded" },
              { num: "18", label: isAr ? "ولاية مغطاة" : "States served" },
              { num: "5★", label: isAr ? "متوسط التقييم" : "Avg. rating" },
            ].map((s, i) => (
              <div key={i}>
                <div className="mono" style={{ fontSize: 56, fontWeight: 600, color: "var(--accent)", letterSpacing: "-0.03em", lineHeight: 1 }}>{s.num}</div>
                <div style={{ marginTop: 12, fontSize: 13, opacity: 0.7, fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="section-head-text">
              <span className="eyebrow">{isAr ? "شركاؤنا" : "Our partners"}</span>
              <h2 className="display-2" style={{ marginTop: 14 }}>{isAr ? "علامات نثق بها." : "Brands we trust."}</h2>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 24 }}>
            {["DEYE", "FELICITY", "JA SOLAR", "NPP", "INVT"].map(b => (
              <div key={b} style={{
                padding: "40px 20px", border: "1px solid var(--border)",
                borderRadius: "var(--radius-lg)", textAlign: "center",
                fontFamily: "var(--font-mono)", fontWeight: 600,
                fontSize: 16, letterSpacing: "0.1em",
                background: "var(--surface)"
              }}>{b}</div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ---------- CONTACT ----------
function ContactPage({ lang }) {
  const isAr = lang === "ar";
  const [submitted, setSubmitted] = uS2(false);
  return (
    <div className="page-enter">
      <section className="section">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80 }}>
            <div>
              <span className="eyebrow">{isAr ? "تواصل معنا" : "Get in touch"}</span>
              <h1 className="display-1" style={{ marginTop: 18, fontSize: "clamp(36px, 5vw, 72px)" }}>
                {isAr ? "تكلّم مع مهندس." : "Talk to an engineer."}
              </h1>
              <p style={{ marginTop: 22, fontSize: 18, color: "var(--fg-muted)", lineHeight: 1.7 }}>
                {isAr
                  ? "أرسل لنا رسالتك أو تواصل معنا عبر واتساب — نرد عادة خلال ساعة."
                  : "Send us a message or reach us on WhatsApp — we usually reply within an hour."}
              </p>

              <div style={{ marginTop: 40, display: "grid", gap: 20 }}>
                {[
                  { ic: "phone", l: isAr ? "هاتف" : "Phone", v: "+249 910 116 161" },
                  { ic: "whatsapp", l: "WhatsApp", v: "+249 128 188 888" },
                  { ic: "pin", l: isAr ? "العنوان" : "Address", v: isAr ? "أم درمان — شارع الوادي، جوار بدر للطيران" : "Omdurman — Al-Wadi St., next to Badr Airlines" },
                ].map((c, i) => (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 18, alignItems: "center" }}>
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: "var(--bg-2)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon name={c.ic} size={20} />
                    </div>
                    <div>
                      <div className="mono" style={{ fontSize: 11, color: "var(--fg-subtle)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{c.l}</div>
                      <div style={{ fontSize: 16, fontWeight: 600, marginTop: 2 }}>{c.v}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-xl)", padding: 40 }}>
              {!submitted ? (
                <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
                  <h3 className="h3" style={{ marginBottom: 24 }}>{isAr ? "أرسل رسالة" : "Send a message"}</h3>
                  <div style={{ display: "grid", gap: 18 }}>
                    <FormField label={isAr ? "الاسم" : "Name"} ph={isAr ? "اسمك الكامل" : "Your full name"} />
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                      <FormField label={isAr ? "هاتف" : "Phone"} ph="+249..." />
                      <FormField label={isAr ? "بريد" : "Email"} ph="you@email.com" />
                    </div>
                    <FormField label={isAr ? "ولايتك" : "State"} ph={isAr ? "الخرطوم" : "Khartoum"} />
                    <FormField label={isAr ? "كيف نساعدك؟" : "How can we help?"} ph={isAr ? "نظام منزلي 5kW..." : "5kW home system..."} textarea />
                    <button type="submit" className="btn btn-primary" style={{ justifyContent: "center", height: 52 }}>
                      {isAr ? "إرسال الرسالة" : "Send message"} <span className="arrow">→</span>
                    </button>
                  </div>
                </form>
              ) : (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <div style={{ width: 64, height: 64, borderRadius: "50%", background: "var(--primary)", color: "var(--primary-fg)", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                    <Icon name="check" size={28} stroke={2} />
                  </div>
                  <h3 className="h3" style={{ marginBottom: 12 }}>{isAr ? "وصلتنا رسالتك!" : "We got your message!"}</h3>
                  <p style={{ color: "var(--fg-muted)" }}>{isAr ? "سنتواصل معك قريباً." : "We'll be in touch soon."}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function FormField({ label, ph, textarea }) {
  return (
    <label style={{ display: "block" }}>
      <span className="mono" style={{ fontSize: 11, color: "var(--fg-subtle)", letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>{label}</span>
      {textarea
        ? <textarea placeholder={ph} rows={4} style={{ width: "100%", padding: "14px 16px", border: "1px solid var(--border)", borderRadius: "var(--radius)", background: "var(--bg)", outline: "none", resize: "vertical" }}/>
        : <input placeholder={ph} style={{ width: "100%", padding: "14px 16px", border: "1px solid var(--border)", borderRadius: "var(--radius)", background: "var(--bg)", outline: "none" }}/>
      }
    </label>
  );
}

Object.assign(window, { CalculatorPage, BlogPage, PostPage, AboutPage, ContactPage });
