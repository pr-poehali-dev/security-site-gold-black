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

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-primary/20 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Icon name="Shield" size={32} className="text-primary" />
              <span className="text-2xl font-montserrat font-bold text-primary">SecureGuard</span>
            </div>

            <div className="hidden md:flex gap-6">
              {["Главная", "О компании", "Услуги", "Портфолио", "Кейсы", "Контакты", "Блог"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase().replace(" ", "-"))}
                  className="text-foreground hover:text-primary transition-colors font-medium"
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

      <section id="главная" className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        <div className="container mx-auto text-center relative z-10 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-montserrat font-bold mb-6 text-primary">
            <EditableText id="hero-title" />
          </h1>
          <p className="text-xl md:text-2xl mb-4 text-foreground/90">
            <EditableText id="hero-subtitle" />
          </p>
          <p className="text-lg text-muted-foreground mb-8">
            <EditableText id="hero-description" />
          </p>
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 text-lg hover-scale"
            onClick={() => scrollToSection("контакты")}
          >
            Связаться с нами
            <Icon name="ArrowRight" size={20} className="ml-2" />
          </Button>
        </div>
      </section>

      <section id="о-компании" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-montserrat font-bold text-center mb-12 text-primary">
            <EditableText id="about-title" />
          </h2>
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 bg-card border-primary/20 gold-glow hover-gold-glow transition-all">
              <p className="text-lg text-foreground/90 leading-relaxed">
                <EditableText id="about-text" />
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section id="услуги" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-montserrat font-bold text-center mb-16 text-primary">
            <EditableText id="services-title" />
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card
                key={service.id}
                className="p-6 bg-card border-primary/20 hover:border-primary/50 transition-all hover-scale gold-glow hover-gold-glow cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mb-4">
                  <Icon name={service.icon as any} size={40} className="text-primary" />
                </div>
                <h3 className="text-xl font-montserrat font-semibold mb-3 text-primary">
                  {service.title}
                </h3>
                <p className="text-foreground/80 text-sm leading-relaxed">{service.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="портфолио" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-montserrat font-bold text-center mb-12 text-primary">
            <EditableText id="portfolio-title" />
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden bg-card border-primary/20 hover-scale">
                <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/10 flex items-center justify-center">
                  <Icon name="Briefcase" size={64} className="text-primary/40" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-montserrat font-semibold mb-2 text-primary">Проект {i}</h3>
                  <p className="text-foreground/80">Успешная реализация комплексной системы безопасности</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="кейсы" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-montserrat font-bold text-center mb-12 text-primary">
            <EditableText id="cases-title" />
          </h2>
          <div className="max-w-4xl mx-auto space-y-6">
            {[1, 2].map((i) => (
              <Card key={i} className="p-8 bg-card border-primary/20 gold-glow">
                <h3 className="text-2xl font-montserrat font-semibold mb-4 text-primary">Кейс {i}</h3>
                <p className="text-foreground/80 mb-4">
                  Подробное описание успешного проекта по обеспечению безопасности крупного предприятия.
                  Реализация комплексной системы защиты информации и контроля доступа.
                </p>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  Читать полностью
                  <Icon name="ArrowRight" size={16} className="ml-2" />
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="блог" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-montserrat font-bold text-center mb-12 text-primary">
            <EditableText id="blog-title" />
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="bg-card border-primary/20 overflow-hidden hover-scale">
                <div className="h-48 bg-gradient-to-br from-secondary/20 to-primary/10 flex items-center justify-center">
                  <Icon name="FileText" size={64} className="text-primary/40" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-montserrat font-semibold mb-2 text-primary">Статья {i}</h3>
                  <p className="text-foreground/70 text-sm mb-4">19 декабря 2025</p>
                  <p className="text-foreground/80 mb-4">Экспертная статья о современных методах обеспечения безопасности бизнеса</p>
                  <Button variant="ghost" className="text-primary hover:text-primary/80 p-0">
                    Читать далее →
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="контакты" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-montserrat font-bold text-center mb-12 text-primary">
            <EditableText id="contact-title" />
          </h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <Card className="p-8 bg-card border-primary/20 gold-glow">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Icon name="Phone" size={24} className="text-primary mt-1" />
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Телефон</p>
                    <p className="text-lg font-medium"><EditableText id="contact-phone" /></p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Icon name="Mail" size={24} className="text-primary mt-1" />
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Email</p>
                    <p className="text-lg font-medium"><EditableText id="contact-email" /></p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Icon name="MapPin" size={24} className="text-primary mt-1" />
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Адрес</p>
                    <p className="text-lg font-medium"><EditableText id="contact-address" /></p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-8 bg-card border-primary/20 gold-glow">
              <form className="space-y-4">
                <Input placeholder="Ваше имя" className="bg-muted border-primary/30" />
                <Input type="email" placeholder="Email" className="bg-muted border-primary/30" />
                <Textarea placeholder="Сообщение" rows={4} className="bg-muted border-primary/30" />
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                  Отправить
                  <Icon name="Send" size={18} className="ml-2" />
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-muted/50 border-t border-primary/20 py-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Icon name="Shield" size={28} className="text-primary" />
              <span className="text-xl font-montserrat font-bold text-primary">SecureGuard</span>
            </div>
            <div className="flex gap-6">
              <button className="text-foreground/60 hover:text-primary transition-colors">
                <Icon name="Linkedin" size={24} />
              </button>
              <button className="text-foreground/60 hover:text-primary transition-colors">
                <Icon name="Twitter" size={24} />
              </button>
              <button className="text-foreground/60 hover:text-primary transition-colors">
                <Icon name="Facebook" size={24} />
              </button>
            </div>
          </div>
          <div className="text-center mt-8 text-sm text-muted-foreground">
            <p>© 2025 SecureGuard. Все права защищены.</p>
            <button
              onClick={() => setShowAdminDialog(true)}
              className="text-xs text-muted-foreground/50 hover:text-primary transition-colors mt-4"
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
