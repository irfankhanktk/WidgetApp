import { getData } from './';
import { URLS } from './api-urls';

export const getWidgetData = () => getData(URLS.get_widget_data);
export const getRegions = () => getData(URLS.get_regions);
export const getOrganizations = (searchTerm?: string, pageNumber?: number) => getData(`${URLS.get_organizations}`);