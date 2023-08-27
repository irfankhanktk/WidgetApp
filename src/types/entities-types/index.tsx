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
  onPress?: () => void
}
export type Organization = {
  id?: number
  orgName?: string
  orgDescription?: string
}

export interface OrganizationCardProps {
  item: Organization;
  index?: number
  onPress?: () => void
}
export type Product = {
  id?: number
  productName?: string
  productDescription?: string
  organizationId?: number
}

export interface ProductCardProps {
  item: Product;
  index?: number
  onPress?: () => void
}

export interface IProductList {
  list: Product[];
  totalRecords: number
}
export interface IOrganizationList {
  list: Organization[];
  totalRecords: number
}
export interface IRegionList {
  list: Region[];
  totalRecords: number
}
