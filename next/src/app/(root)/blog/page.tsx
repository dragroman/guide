import ArticleTeaserList from "@/components/drupal/ArticleTeaserList"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import React from "react"

type Props = {}

export default async function Blog() {
  return (
    <div className="bg-gray-100 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <p className="text-xs uppercase tracking-widest text-pink-600 font-semibold mb-2">
              Блог
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Последние записи<span className="text-pink-600">.</span>
            </h2>
            <p className="text-lg text-gray-600 mt-4">
              Истории, советы и наблюдения из жизни в Китае
            </p>
          </div>
          <div className="space-y-16"></div>
        </div>
      </div>
    </div>
  )
}
