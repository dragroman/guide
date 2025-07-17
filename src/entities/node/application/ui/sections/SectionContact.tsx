import { TApplicationFull } from "../../model/types"
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card"
import { Phone, Mail, MessageCircle } from "lucide-react"

export const SectionContact = ({ node }: { node: TApplicationFull }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Phone className="h-5 w-5" />
          Контактная информация
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {node.field_email && (
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{node.field_email}</p>
              </div>
            </div>
          )}

          {node.field_phone && (
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Телефон</p>
                <p className="font-medium">{node.field_phone}</p>
              </div>
            </div>
          )}

          {node.field_telegram && (
            <div className="flex items-center gap-3">
              <MessageCircle className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Telegram</p>
                <p className="font-medium">{node.field_telegram}</p>
              </div>
            </div>
          )}

          {node.field_wechat && (
            <div className="flex items-center gap-3">
              <MessageCircle className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">WeChat</p>
                <p className="font-medium">{node.field_wechat}</p>
              </div>
            </div>
          )}

          {node.field_whatsapp && (
            <div className="flex items-center gap-3">
              <MessageCircle className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">WhatsApp</p>
                <p className="font-medium">{node.field_whatsapp}</p>
              </div>
            </div>
          )}
        </div>

        {node.field_expert_email && (
          <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
            <p className="text-sm text-amber-800">
              <strong>Email эксперта:</strong> {node.field_expert_email}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
