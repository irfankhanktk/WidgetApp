import { Product } from 'types/entities-types';
import { deleteData, getData, postData, putData } from './';
import { URLS } from './api-urls';

export const getWidgetData = () => {
    const randomNumber = Math.floor(Math.random() * 101);
    return getData(
        `${URLS.get_widget_data}from=Pkr&to=US&amount=${randomNumber}`
    );
};
export const getRegions = (
    pageNumber = 1,
    pageSize = 10,
    searchQuery?: string
) => {
    let url = `${URLS.get_regions}?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    if (searchQuery) {
        url += `&searchQuery=${searchQuery}`;
    }
    return getData(url);
    // return new Array(10).fill({})
};
export const getOrganizations = (
    regionId: number,
    pageNumber = 1,
    pageSize = 10,
    searchQuery?: string
) => {
    let url = `${URLS.get_organizations}?regionId=${regionId}&pageNumber=${pageNumber}&pageSize=${pageSize}`;
    if (searchQuery) {
        url += `&searchQuery=${searchQuery}`;
    }
    return getData(url);
};
export const getProducts = (
    OrganizationId: number,
    pageNumber = 1,
    pageSize = 10,
    searchQuery?: string
) => {
    let url = `${URLS.product.get_products}?OrganizationId=${OrganizationId}&pageNumber=${pageNumber}&pageSize=${pageSize}`;
    if (searchQuery) {
        url += `&searchQuery=${searchQuery}`;
    }
    return getData(url);
};

export const getProductDetails = (productId?: number) =>
    getData(`${URLS.product.get_product}${productId}`);

export const addUpdateProduct = (data?: Product) => {
    if (data?.id) {
        return putData(`${URLS.product.update_product}${data?.id}`, data);
    }
    return postData(`${URLS.product.add_product}`, data);
};
export const onDeleteProduct = (productId?: number) =>
    deleteData(`${URLS.product.delete_product}${productId}`);
