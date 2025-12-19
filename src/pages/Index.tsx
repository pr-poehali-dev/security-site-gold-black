import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

interface EditableContent {
  id: string;
  type: "text" | "image" | "title";
  content: string;
}

const Index = () => {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [showAdminDialog, setShowAdminDialog] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [tempContent, setTempContent] = useState("");

  const [content, setContent] = useState<Record<string, string>>({
    "hero-title": "Аутсорсинг службы безопасности",
    "hero-subtitle": "Комплексная защита вашего бизнеса от внутренних и внешних угроз",
    "hero-description": "Профессиональные решения для обеспечения безопасности предприятия",
    "about-title": "О компании",
    "about-text": "Мы предоставляем профессиональные услуги по обеспечению безопасности бизнеса. Наша команда экспертов обладает многолетним опытом работы с крупнейшими предприятиями.",
    "services-title": "Наши услуги",
    "portfolio-title": "Портфолио",
    "cases-title": "Кейсы",
    "blog-title": "Блог",
    "contact-title": "Контакты",
    "contact-phone": "+7 (495) 123-45-67",
    "contact-email": "info@security.com",
    "contact-address": "Москва, ул. Примерная, д. 1",
    "portfolio-1-img": "",
    "portfolio-1-title": "Проект 1",
    "portfolio-1-desc": "Успешная реализация комплексной системы безопасности",
    "portfolio-2-img": "",
    "portfolio-2-title": "Проект 2",
    "portfolio-2-desc": "Успешная реализация комплексной системы безопасности",
    "portfolio-3-img": "",
    "portfolio-3-title": "Проект 3",
    "portfolio-3-desc": "Успешная реализация комплексной системы безопасности",
    "case-1-img": "",
    "case-1-title": "Кейс 1",
    "case-1-desc": "Подробное описание успешного проекта по обеспечению безопасности крупного предприятия. Реализация комплексной системы защиты информации и контроля доступа.",
    "case-2-img": "",
    "case-2-title": "Кейс 2",
    "case-2-desc": "Подробное описание успешного проекта по обеспечению безопасности крупного предприятия. Реализация комплексной системы защиты информации и контроля доступа.",
  });

  const services = [
    {
      id: "service-1",
      icon: "Search",
      title: "Проверка контрагентов",
      description: "Комплексная или выборочная проверка контрагентов: анализ благонадежности, финансовой документации, кредитной истории"
    },
    {
      id: "service-2",
      icon: "UserCheck",
      title: "Проверка кандидатов",
      description: "Тщательная проверка кандидатов при приеме на работу, проверка квалификации и опыта"
    },
    {
      id: "service-3",
      icon: "FileText",
      title: "Аналитические материалы",
      description: "Подготовка информационно-аналитических материалов по запросу клиента"
    },
    {
      id: "service-4",
      icon: "BarChart",
      title: "Финансовый аудит",
      description: "Профессиональный финансовый аудит и анализ безопасности предприятия"
    },
    {
      id: "service-5",
      icon: "Shield",
      title: "Защита информации",
      description: "Контроль сохранности коммерческой тайны, внедрение DLP, SIEM, антивирусных комплексов"
    },
    {
      id: "service-6",
      icon: "AlertTriangle",
      title: "Антикоррупционная политика",
      description: "Разработка и реализация антикоррупционной политики, выявление внутрикорпоративных злоупотреблений"
    },
    {
      id: "service-7",
      icon: "Scale",
      title: "Взаимодействие с органами",
      description: "Работа с правоохранительными и государственными органами по защите интересов предприятия"
    },
    {
      id: "service-8",
      icon: "Eye",
      title: "Ревизии и проверки",
      description: "Выявление и предотвращение хищений, проверка объёмов выполненных работ подрядных организаций"
    }
  ];

  useEffect(() => {
    const saved = localStorage.getItem("securityContent");
    if (saved) {
      setContent(JSON.parse(saved));
    }
  }, []);

  const saveContent = () => {
    localStorage.setItem("securityContent", JSON.stringify(content));
    toast.success("Изменения сохранены");
  };

  const handleAdminLogin = () => {
    if (adminPassword === "admin123") {
      setIsAdminMode(true);
      setShowAdminDialog(false);
      toast.success("Режим редактирования активирован");
    } else {
      toast.error("Неверный пароль");
    }
  };

  const handleEdit = (id: string) => {
    setEditingId(id);
    setTempContent(content[id] || "");
  };

  const handleSaveEdit = () => {
    if (editingId) {
      setContent({ ...content, [editingId]: tempContent });
      setEditingId(null);
      saveContent();
    }
  };

  const handleImageUpload = (id: string, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setContent({ ...content, [id]: e.target?.result as string });
      saveContent();
    };
    reader.readAsDataURL(file);
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const EditableText = ({ id, className = "" }: { id: string; className?: string }) => {
    if (isAdminMode && editingId === id) {
      return (
        <div className="flex gap-2 items-center">
          {id.includes("title") ? (
            <Input
              value={tempContent}
              onChange={(e) => setTempContent(e.target.value)}
              className="bg-muted border-primary"
            />
          ) : (
            <Textarea
              value={tempContent}
              onChange={(e) => setTempContent(e.target.value)}
              className="bg-muted border-primary"
            />
          )}
          <Button size="sm" onClick={handleSaveEdit} className="bg-primary hover:bg-primary/90">
            <Icon name="Check" size={16} />
          </Button>
        </div>
      );
    }

    return (
      <div className={`relative group ${className}`}>
        {content[id]}
        {isAdminMode && (
          <Button
            size="sm"
            variant="outline"
            className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => handleEdit(id)}
          >
            <Icon name="Edit" size={14} />
          </Button>
        )}
      </div>
    );
  };

  const EditableImage = ({ id, className = "" }: { id: string; className?: string }) => {
    const imgSrc = content[id];
    const fileInputRef = useState<HTMLInputElement | null>(null)[0];

    const handleImageClick = () => {
      if (isAdminMode) {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e: any) => {
          const file = e.target?.files?.[0];
          if (file) {
            handleImageUpload(id, file);
            toast.success("Изображение загружено");
          }
        };
        input.click();
      }
    };

    return (
      <div className={`relative group ${className} cursor-pointer`} onClick={handleImageClick}>
        {imgSrc ? (
          <img src={imgSrc} alt="Uploaded" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/10 flex items-center justify-center">
            <Icon name="Image" size={64} className="text-primary/40" />
          </div>
        )}
        {isAdminMode && (
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="text-center text-white">
              <Icon name="Upload" size={32} className="mx-auto mb-2" />
              <p className="text-sm font-medium">Загрузить изображение</p>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="fixed top-0 w-full bg-black/90 backdrop-blur-md border-b border-primary/30 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-lg" />
                <Icon name="Shield" size={32} className="text-primary relative z-10" />
              </div>
              <span className="text-2xl font-montserrat font-bold text-primary uppercase tracking-wider">SecureGuard</span>
            </div>

            <div className="hidden md:flex gap-8">
              {["Главная", "Услуги", "Портфолио", "Кейсы", "Контакты"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase().replace(" ", "-"))}
                  className="text-foreground/80 hover:text-primary transition-colors font-medium uppercase text-sm tracking-wide"
                >
                  {item}
                </button>
              ))}
            </div>

            <button
              className="md:hidden text-primary"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Icon name={mobileMenuOpen ? "X" : "Menu"} size={24} />
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-3 animate-fade-in">
              {["Главная", "О компании", "Услуги", "Портфолио", "Кейсы", "Контакты", "Блог"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase().replace(" ", "-"))}
                  className="block w-full text-left px-4 py-2 text-foreground hover:text-primary hover:bg-muted rounded transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      <section id="главная" className="pt-32 pb-32 px-4 relative overflow-hidden hero-bg cyber-grid">
        <div className="absolute inset-0 tech-pattern pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="container mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-left animate-fade-in">
              <h1 className="text-5xl md:text-7xl font-montserrat font-bold mb-6 text-primary uppercase leading-tight">
                <EditableText id="hero-title" />
              </h1>
              <p className="text-lg md:text-xl mb-6 text-foreground/80">
                <EditableText id="hero-subtitle" />
              </p>
              <Button
                size="lg"
                className="bg-transparent border-2 border-primary hover:bg-primary text-primary hover:text-black font-semibold px-8 py-6 text-lg transition-all uppercase tracking-wider"
                onClick={() => scrollToSection("контакты")}
              >
                Подробнее
              </Button>
            </div>
            <div className="relative animate-fade-in">
              <div className="relative w-full aspect-square flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-2xl" />
                <img 
                  src="https://cdn.poehali.dev/files/generated-image-6b56f54c-2258-4cea-9f07-05015a6baf01 (2).jpg" 
                  alt="Security Shield" 
                  className="relative z-10 w-3/4 drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="о-компании" className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        <div className="container mx-auto relative z-10">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-montserrat font-bold mb-4 text-primary uppercase text-center">
              Почему выбирают нас?
            </h2>
            <div className="h-1 w-24 bg-primary mx-auto mb-12" />
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: "CheckCircle", title: "Профессионализм", desc: "Команда экспертов с многолетним опытом" },
                { icon: "Target", title: "Индивидуальный подход", desc: "Решения под ваши задачи" },
                { icon: "Zap", title: "Современные технологии", desc: "Передовые методы защиты" }
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon name={item.icon as any} size={32} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-montserrat font-semibold mb-2 text-primary uppercase">{item.title}</h3>
                  <p className="text-foreground/70 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="услуги" className="py-20 px-4 relative">
        <div className="absolute inset-0 cyber-grid opacity-30" />
        <div className="container mx-auto relative z-10">
          <h2 className="text-4xl md:text-5xl font-montserrat font-bold text-center mb-4 text-primary uppercase">
            <EditableText id="services-title" />
          </h2>
          <div className="h-1 w-24 bg-primary mx-auto mb-16" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.slice(0, 6).map((service, index) => (
              <div
                key={service.id}
                className="service-card p-8 hover:border-primary/60 transition-all cursor-pointer group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mb-6 relative">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon name={service.icon as any} size={40} className="text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-montserrat font-semibold mb-4 text-primary uppercase tracking-wide">
                  {service.title}
                </h3>
                <p className="text-foreground/70 text-sm leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="портфолио" className="py-20 px-4 relative">
        <div className="absolute inset-0 cyber-grid opacity-20" />
        <div className="container mx-auto relative z-10">
          <h2 className="text-4xl md:text-5xl font-montserrat font-bold text-center mb-4 text-primary uppercase">
            <EditableText id="portfolio-title" />
          </h2>
          <div className="h-1 w-24 bg-primary mx-auto mb-16" />
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="service-card overflow-hidden group hover:border-primary/60 transition-all">
                <div className="h-56 overflow-hidden bg-black">
                  <EditableImage id={`portfolio-${i}-img`} className="h-full group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-montserrat font-semibold mb-2 text-primary uppercase">
                    <EditableText id={`portfolio-${i}-title`} />
                  </h3>
                  <p className="text-foreground/70 text-sm">
                    <EditableText id={`portfolio-${i}-desc`} />
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="кейсы" className="py-20 px-4 bg-gradient-to-b from-transparent via-primary/5 to-transparent">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-montserrat font-bold text-center mb-4 text-primary uppercase">
            <EditableText id="cases-title" />
          </h2>
          <div className="h-1 w-24 bg-primary mx-auto mb-16" />
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
            {[1, 2].map((i) => (
              <div key={i} className="service-card overflow-hidden group hover:border-primary/60 transition-all">
                <div className="h-64 overflow-hidden bg-black">
                  <EditableImage id={`case-${i}-img`} className="h-full group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-montserrat font-semibold mb-3 text-primary uppercase">
                    <EditableText id={`case-${i}-title`} />
                  </h3>
                  <p className="text-foreground/70 text-sm mb-4 line-clamp-3">
                    <EditableText id={`case-${i}-desc`} />
                  </p>
                  <Button variant="ghost" className="text-primary hover:text-primary/80 p-0 uppercase tracking-wider text-sm">
                    Читать →
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="блог" className="py-20 px-4 relative">
        <div className="absolute inset-0 cyber-grid opacity-20" />
        <div className="container mx-auto relative z-10">
          <h2 className="text-4xl md:text-5xl font-montserrat font-bold text-center mb-4 text-primary uppercase">
            <EditableText id="blog-title" />
          </h2>
          <div className="h-1 w-24 bg-primary mx-auto mb-16" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="service-card overflow-hidden group hover:border-primary/60 transition-all">
                <div className="h-48 bg-gradient-to-br from-primary/10 to-black flex items-center justify-center">
                  <Icon name="FileText" size={64} className="text-primary/60" />
                </div>
                <div className="p-6">
                  <p className="text-primary/60 text-xs mb-2 uppercase tracking-wider">19 декабря 2025</p>
                  <h3 className="text-lg font-montserrat font-semibold mb-3 text-primary uppercase">Статья {i}</h3>
                  <p className="text-foreground/70 text-sm mb-4">Экспертная статья о современных методах обеспечения безопасности</p>
                  <Button variant="ghost" className="text-primary hover:text-primary/80 p-0 uppercase text-sm tracking-wider">
                    Читать →
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="контакты" className="py-20 px-4 bg-gradient-to-b from-transparent via-primary/5 to-black">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-montserrat font-bold text-center mb-4 text-primary uppercase">
            <EditableText id="contact-title" />
          </h2>
          <div className="h-1 w-24 bg-primary mx-auto mb-16" />
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="service-card p-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Icon name="Phone" size={24} className="text-primary mt-1" />
                  <div>
                    <p className="text-sm text-primary/60 mb-1 uppercase tracking-wide">Телефон</p>
                    <p className="text-lg font-medium text-foreground"><EditableText id="contact-phone" /></p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Icon name="Mail" size={24} className="text-primary mt-1" />
                  <div>
                    <p className="text-sm text-primary/60 mb-1 uppercase tracking-wide">Email</p>
                    <p className="text-lg font-medium text-foreground"><EditableText id="contact-email" /></p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Icon name="MapPin" size={24} className="text-primary mt-1" />
                  <div>
                    <p className="text-sm text-primary/60 mb-1 uppercase tracking-wide">Адрес</p>
                    <p className="text-lg font-medium text-foreground"><EditableText id="contact-address" /></p>
                  </div>
                </div>
              </div>
            </div>

            <div className="service-card p-8">
              <form className="space-y-4">
                <Input placeholder="Ваше имя" className="bg-black/50 border-primary/30 focus:border-primary" />
                <Input type="email" placeholder="Email" className="bg-black/50 border-primary/30 focus:border-primary" />
                <Textarea placeholder="Сообщение" rows={4} className="bg-black/50 border-primary/30 focus:border-primary" />
                <Button className="w-full bg-transparent border-2 border-primary hover:bg-primary text-primary hover:text-black font-semibold uppercase tracking-wider transition-all">
                  Отправить
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-black border-t border-primary/30 py-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-lg" />
                <Icon name="Shield" size={28} className="text-primary relative z-10" />
              </div>
              <span className="text-xl font-montserrat font-bold text-primary uppercase tracking-wider">SecureGuard</span>
            </div>
            <div className="flex gap-6">
              <button className="text-foreground/40 hover:text-primary transition-colors">
                <Icon name="Linkedin" size={24} />
              </button>
              <button className="text-foreground/40 hover:text-primary transition-colors">
                <Icon name="Twitter" size={24} />
              </button>
              <button className="text-foreground/40 hover:text-primary transition-colors">
                <Icon name="Facebook" size={24} />
              </button>
            </div>
          </div>
          <div className="text-center mt-8 text-sm text-muted-foreground">
            <p className="text-foreground/50">© 2025 SecureGuard. Все права защищены.</p>
            <button
              onClick={() => setShowAdminDialog(true)}
              className="text-xs text-foreground/30 hover:text-primary transition-colors mt-4"
            >
              Панель управления
            </button>
          </div>
        </div>
      </footer>

      <Dialog open={showAdminDialog} onOpenChange={setShowAdminDialog}>
        <DialogContent className="bg-card border-primary/30">
          <DialogHeader>
            <DialogTitle className="text-primary font-montserrat">Вход в админ-панель</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              type="password"
              placeholder="Введите пароль"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              className="bg-muted border-primary/30"
              onKeyDown={(e) => e.key === "Enter" && handleAdminLogin()}
            />
            <Button
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={handleAdminLogin}
            >
              Войти
            </Button>
            <p className="text-xs text-muted-foreground text-center">Пароль по умолчанию: admin123</p>
          </div>
        </DialogContent>
      </Dialog>

      {isAdminMode && (
        <div className="fixed bottom-4 right-4 z-50 space-y-2">
          <Button
            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
            onClick={() => {
              setIsAdminMode(false);
              toast.info("Режим редактирования отключен");
            }}
          >
            <Icon name="X" size={18} className="mr-2" />
            Выйти из режима редактирования
          </Button>
        </div>
      )}
    </div>
  );
};

export default Index;