import { drupal } from "@/shared/lib/drupal"

export async function checkUserExists(
  email: string,
  username: string
): Promise<{ exists: boolean; field?: string }> {
  try {
    // Проверяем существование пользователя по email
    const usersByEmail = await drupal.getResourceCollection("user--user", {
      params: {
        "filter[mail]": email,
        "fields[user--user]": "drupal_internal__uid,mail",
        "page[limit]": 1,
      },
      withAuth: true,
    })

    if (usersByEmail && usersByEmail.length > 0) {
      return { exists: true, field: "email" }
    }

    // Проверяем существование пользователя по username
    const usersByUsername = await drupal.getResourceCollection("user--user", {
      params: {
        "filter[name]": username,
        "fields[user--user]": "drupal_internal__uid,name",
        "page[limit]": 1,
      },
      withAuth: true,
    })

    if (usersByUsername && usersByUsername.length > 0) {
      return { exists: true, field: "username" }
    }

    return { exists: false }
  } catch (error) {
    console.error("Ошибка проверки существования пользователя:", error)
    throw new Error("Ошибка проверки существования пользователя")
  }
}
