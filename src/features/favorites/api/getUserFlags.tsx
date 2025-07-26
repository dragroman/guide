"use server"

export async function getUserFlags(userId: string, token: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/jsonapi/flagging/favorite?filter[uid.id]=${userId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  )

  const data = await response.json()
  return data.data.map((flag: any) => flag.attributes.entity_id)
}
