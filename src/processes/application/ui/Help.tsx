import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@shared/ui/dialog"
import { HelpCircle } from "lucide-react"

export function HelpTotal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-muted-foreground hover:text-primary transition-colors">
          <HelpCircle className="h-4 w-4" />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="text-left">
          <DialogTitle>Расчет стоимости по возрастным группам</DialogTitle>
          <DialogDescription>
            Для удобства расчета общей стоимости применяются следующие
            коэффициенты
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <p>Стоимость рассчитывается с учетом возрастных коэффициентов:</p>
          <ul className="list-disc list-inside mt-3 space-y-1">
            <li>Взрослые: 100% стоимости</li>
            <li>Подростки (13-17 лет): 90% стоимости</li>
            <li>Пожилые (70+ лет): 80% стоимости</li>
            <li>Дети (7-12 лет): 50% стоимости</li>
            <li>Дети (3-6 лет): 30% стоимости</li>
            <li>Младенцы (до 2 лет): бесплатно</li>
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function HelpVisa() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-muted-foreground hover:text-primary transition-colors">
          <HelpCircle className="h-4 w-4" />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="text-left">
          <DialogTitle>Кому нужна виза?</DialogTitle>
          <DialogDescription>
            <strong>Не отмечайте</strong> это поле, если оформляете визу
            самостоятельно
          </DialogDescription>
          <DialogDescription>
            <strong>Отметьте это поле</strong>, если вам нужна виза на вылет или
            обратный вылет. Для поездки в Китай виза требуется большинству
            путешественников. Безвизовый транзит возможен только при
            определенных условиях и на ограниченный срок.
          </DialogDescription>
        </DialogHeader>
        <div>
          <p>Основная информация о визе в Китай:</p>
          <ul className="list-disc list-inside mt-3 space-y-1">
            <li>Туристическая виза (L) - для туристических поездок</li>
            <li>Срок оформления: 4-7 рабочих дней</li>
            <li>Необходимы: загранпаспорт, фото, бронь отеля, билеты</li>
            <li>Рекомендуется подавать за 2 недели до поездки</li>
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  )
}
