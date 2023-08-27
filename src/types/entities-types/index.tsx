import { colors } from "config/colors"

export type Theme = {
  dark: boolean
  colors: typeof colors
}

export type Region = {
  id?: number
  regionName?: string
  regionDescription?: string
}

export interface RegionCardProps {
  item: Region;
  index?: number
}
