import { getData } from './';
import { URLS } from './api-urls';

export const getWidgetData = () => getData(URLS.get_widget_data);
export const getRegions = (pageNumber = 1, pageSize = 10, searchQuery?: string) => {
    let url = `${URLS.get_regions}?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    if (searchQuery) {
        url += `&searchQuery=${searchQuery}`;
    }
    return getData(url);
    // return new Array(10).fill({})
};
export const getOrganizations = (pageNumber = 1, pageSize = 10, searchQuery?: string) => {
    let url = `${URLS.get_organizations}?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    if (searchQuery) {
        url += `&searchQuery=${searchQuery}`;
    }
    return getData(url);
};
export const getProducts = (pageNumber = 1, pageSize = 10, searchQuery?: string) => {
    // let url = `${URLS.product.get_products}?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    // if (searchQuery) {
    //     url += `&searchQuery=${searchQuery}`;
    // }
    // return getData(url);
    return new Array(10).fill({})
};

// export const getOrganizations = (searchTerm?: string, pageNumber?: number) => getData(`${URLS.get_organizations}`);