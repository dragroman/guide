import { DrupalFile, DrupalMedia, DrupalNode } from "next-drupal"

export interface TNodeBlog extends DrupalNode {
  field_cover: {
    field_media_image: DrupalFile
  }
}
