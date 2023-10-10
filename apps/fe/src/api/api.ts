/* tslint:disable */
/* eslint-disable */
/**
 * Event
 * Logging events
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import type { Configuration } from './configuration';
import type { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
import globalAxios from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from './common';
import type { RequestArgs } from './base';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, BaseAPI, RequiredError } from './base';

/**
 * 
 * @export
 * @interface CreateEventDto
 */
export interface CreateEventDto {
    /**
     * The name of the event.
     * @type {string}
     * @memberof CreateEventDto
     */
    'name': string;
    /**
     * The description of the event.
     * @type {string}
     * @memberof CreateEventDto
     */
    'description': string;
    /**
     * 
     * @type {EventType}
     * @memberof CreateEventDto
     */
    'type': EventType;
    /**
     * The priority of the event.
     * @type {number}
     * @memberof CreateEventDto
     */
    'priority': number;
}


/**
 * 
 * @export
 * @interface EventDto
 */
export interface EventDto {
    /**
     * The id of the event.
     * @type {number}
     * @memberof EventDto
     */
    'id': number;
    /**
     * The name of the event.
     * @type {string}
     * @memberof EventDto
     */
    'name': string;
    /**
     * The description of the event.
     * @type {string}
     * @memberof EventDto
     */
    'description': string;
    /**
     * 
     * @type {EventType}
     * @memberof EventDto
     */
    'type': EventType;
    /**
     * The priority of the event.
     * @type {number}
     * @memberof EventDto
     */
    'priority': number;
}


/**
 * 
 * @export
 * @enum {string}
 */

export const EventType = {
    Crosspromo: 'CROSSPROMO',
    Liveops: 'LIVEOPS',
    App: 'APP',
    Ads: 'ADS'
} as const;

export type EventType = typeof EventType[keyof typeof EventType];



/**
 * DefaultApi - axios parameter creator
 * @export
 */
export const DefaultApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        appControllerGetHello: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * DefaultApi - functional programming interface
 * @export
 */
export const DefaultApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = DefaultApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async appControllerGetHello(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.appControllerGetHello(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * DefaultApi - factory interface
 * @export
 */
export const DefaultApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = DefaultApiFp(configuration)
    return {
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        appControllerGetHello(options?: any): AxiosPromise<void> {
            return localVarFp.appControllerGetHello(options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * DefaultApi - object-oriented interface
 * @export
 * @class DefaultApi
 * @extends {BaseAPI}
 */
export class DefaultApi extends BaseAPI {
    /**
     * 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public appControllerGetHello(options?: AxiosRequestConfig) {
        return DefaultApiFp(this.configuration).appControllerGetHello(options).then((request) => request(this.axios, this.basePath));
    }
}



/**
 * EventsApi - axios parameter creator
 * @export
 */
export const EventsApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Create a new event
         * @param {string} country 
         * @param {CreateEventDto} createEventDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        eventsControllerCreateEvent: async (country: string, createEventDto: CreateEventDto, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'country' is not null or undefined
            assertParamExists('eventsControllerCreateEvent', 'country', country)
            // verify required parameter 'createEventDto' is not null or undefined
            assertParamExists('eventsControllerCreateEvent', 'createEventDto', createEventDto)
            const localVarPath = `/events/{country}`
                .replace(`{${"country"}}`, encodeURIComponent(String(country)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(createEventDto, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Delete an existing event
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        eventsControllerDeleteEvent: async (id: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('eventsControllerDeleteEvent', 'id', id)
            const localVarPath = `/events/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Retrieve all events
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        eventsControllerGetEvents: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/events`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Update an existing event
         * @param {number} id 
         * @param {string} country 
         * @param {CreateEventDto} createEventDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        eventsControllerUpdateEvent: async (id: number, country: string, createEventDto: CreateEventDto, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('eventsControllerUpdateEvent', 'id', id)
            // verify required parameter 'country' is not null or undefined
            assertParamExists('eventsControllerUpdateEvent', 'country', country)
            // verify required parameter 'createEventDto' is not null or undefined
            assertParamExists('eventsControllerUpdateEvent', 'createEventDto', createEventDto)
            const localVarPath = `/events/{country}/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)))
                .replace(`{${"country"}}`, encodeURIComponent(String(country)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(createEventDto, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * EventsApi - functional programming interface
 * @export
 */
export const EventsApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = EventsApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary Create a new event
         * @param {string} country 
         * @param {CreateEventDto} createEventDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async eventsControllerCreateEvent(country: string, createEventDto: CreateEventDto, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.eventsControllerCreateEvent(country, createEventDto, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Delete an existing event
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async eventsControllerDeleteEvent(id: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.eventsControllerDeleteEvent(id, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Retrieve all events
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async eventsControllerGetEvents(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<EventDto>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.eventsControllerGetEvents(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Update an existing event
         * @param {number} id 
         * @param {string} country 
         * @param {CreateEventDto} createEventDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async eventsControllerUpdateEvent(id: number, country: string, createEventDto: CreateEventDto, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.eventsControllerUpdateEvent(id, country, createEventDto, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * EventsApi - factory interface
 * @export
 */
export const EventsApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = EventsApiFp(configuration)
    return {
        /**
         * 
         * @summary Create a new event
         * @param {string} country 
         * @param {CreateEventDto} createEventDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        eventsControllerCreateEvent(country: string, createEventDto: CreateEventDto, options?: any): AxiosPromise<void> {
            return localVarFp.eventsControllerCreateEvent(country, createEventDto, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Delete an existing event
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        eventsControllerDeleteEvent(id: number, options?: any): AxiosPromise<void> {
            return localVarFp.eventsControllerDeleteEvent(id, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Retrieve all events
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        eventsControllerGetEvents(options?: any): AxiosPromise<Array<EventDto>> {
            return localVarFp.eventsControllerGetEvents(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Update an existing event
         * @param {number} id 
         * @param {string} country 
         * @param {CreateEventDto} createEventDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        eventsControllerUpdateEvent(id: number, country: string, createEventDto: CreateEventDto, options?: any): AxiosPromise<void> {
            return localVarFp.eventsControllerUpdateEvent(id, country, createEventDto, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * EventsApi - object-oriented interface
 * @export
 * @class EventsApi
 * @extends {BaseAPI}
 */
export class EventsApi extends BaseAPI {
    /**
     * 
     * @summary Create a new event
     * @param {string} country 
     * @param {CreateEventDto} createEventDto 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof EventsApi
     */
    public eventsControllerCreateEvent(country: string, createEventDto: CreateEventDto, options?: AxiosRequestConfig) {
        return EventsApiFp(this.configuration).eventsControllerCreateEvent(country, createEventDto, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Delete an existing event
     * @param {number} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof EventsApi
     */
    public eventsControllerDeleteEvent(id: number, options?: AxiosRequestConfig) {
        return EventsApiFp(this.configuration).eventsControllerDeleteEvent(id, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Retrieve all events
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof EventsApi
     */
    public eventsControllerGetEvents(options?: AxiosRequestConfig) {
        return EventsApiFp(this.configuration).eventsControllerGetEvents(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Update an existing event
     * @param {number} id 
     * @param {string} country 
     * @param {CreateEventDto} createEventDto 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof EventsApi
     */
    public eventsControllerUpdateEvent(id: number, country: string, createEventDto: CreateEventDto, options?: AxiosRequestConfig) {
        return EventsApiFp(this.configuration).eventsControllerUpdateEvent(id, country, createEventDto, options).then((request) => request(this.axios, this.basePath));
    }
}



