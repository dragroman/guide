import { TApplicationFull } from "../../model/types"
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card"
import { Badge } from "@shared/ui/badge"
import { Wallet, CreditCard, Shield, UserCheck } from "lucide-react"

export const SectionBudget = ({ node }: { node: TApplicationFull }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="h-5 w-5" />
          Бюджет и услуги
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {node.field_budget && (
          <div>
            <h4 className="font-medium text-gray-900">
              Бюджет на человека в день
            </h4>
            <div className="text-2xl font-bold text-green-600">
              {node.field_budget.toLocaleString("ru-RU")} ₽
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {node.field_need_visa && (
            <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
              <CreditCard className="h-4 w-4 text-blue-600" />
              <span className="text-blue-900 text-sm">Нужна виза</span>
            </div>
          )}

          {node.field_need_insurance && (
            <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
              <Shield className="h-4 w-4 text-green-600" />
              <span className="text-green-900 text-sm">Нужна страховка</span>
            </div>
          )}

          {node.field_need_guide && (
            <div className="flex items-center gap-2 p-3 bg-purple-50 rounded-lg">
              <UserCheck className="h-4 w-4 text-purple-600" />
              <span className="text-purple-900 text-sm">Нужен гид</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
