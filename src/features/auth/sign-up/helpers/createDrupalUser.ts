export async function createDrupalUser(userData: any) {
  try {
    const drupalResponse = await fetch(
      `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/user/register?_format=json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mail: [{ value: userData.email }],
          name: [{ value: userData.username }],
          pass: [{ value: userData.password }],
          field_firstname: [{ value: userData.firstName }],
          field_lastname: [{ value: userData.lastName }],
        }),
      }
    )

    if (!drupalResponse.ok) {
      const error = await drupalResponse.json()
      throw new Error(error.message || "Ошибка создания пользователя")
    }

    return await drupalResponse.json()
  } catch (error) {
    console.error("Error creating Drupal user:", error)
    throw new Error("Ошибка создания пользователя в системе")
  }
}
