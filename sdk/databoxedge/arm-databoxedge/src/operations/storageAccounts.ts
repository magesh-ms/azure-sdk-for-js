/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper";
import { StorageAccounts } from "../operationsInterfaces";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { DataBoxEdgeManagementClient } from "../dataBoxEdgeManagementClient";
import { PollerLike, PollOperationState, LroEngine } from "@azure/core-lro";
import { LroImpl } from "../lroImpl";
import {
  StorageAccount,
  StorageAccountsListByDataBoxEdgeDeviceNextOptionalParams,
  StorageAccountsListByDataBoxEdgeDeviceOptionalParams,
  StorageAccountsListByDataBoxEdgeDeviceResponse,
  StorageAccountsGetOptionalParams,
  StorageAccountsGetResponse,
  StorageAccountsCreateOrUpdateOptionalParams,
  StorageAccountsCreateOrUpdateResponse,
  StorageAccountsDeleteOptionalParams,
  StorageAccountsListByDataBoxEdgeDeviceNextResponse
} from "../models";

/// <reference lib="esnext.asynciterable" />
/** Class containing StorageAccounts operations. */
export class StorageAccountsImpl implements StorageAccounts {
  private readonly client: DataBoxEdgeManagementClient;

  /**
   * Initialize a new instance of the class StorageAccounts class.
   * @param client Reference to the service client
   */
  constructor(client: DataBoxEdgeManagementClient) {
    this.client = client;
  }

  /**
   * Lists all the StorageAccounts in a Data Box Edge/Data Box Gateway device.
   * @param deviceName The device name.
   * @param resourceGroupName The resource group name.
   * @param options The options parameters.
   */
  public listByDataBoxEdgeDevice(
    deviceName: string,
    resourceGroupName: string,
    options?: StorageAccountsListByDataBoxEdgeDeviceOptionalParams
  ): PagedAsyncIterableIterator<StorageAccount> {
    const iter = this.listByDataBoxEdgeDevicePagingAll(
      deviceName,
      resourceGroupName,
      options
    );
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings?: PageSettings) => {
        if (settings?.maxPageSize) {
          throw new Error("maxPageSize is not supported by this operation.");
        }
        return this.listByDataBoxEdgeDevicePagingPage(
          deviceName,
          resourceGroupName,
          options,
          settings
        );
      }
    };
  }

  private async *listByDataBoxEdgeDevicePagingPage(
    deviceName: string,
    resourceGroupName: string,
    options?: StorageAccountsListByDataBoxEdgeDeviceOptionalParams,
    settings?: PageSettings
  ): AsyncIterableIterator<StorageAccount[]> {
    let result: StorageAccountsListByDataBoxEdgeDeviceResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._listByDataBoxEdgeDevice(
        deviceName,
        resourceGroupName,
        options
      );
      let page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._listByDataBoxEdgeDeviceNext(
        deviceName,
        resourceGroupName,
        continuationToken,
        options
      );
      continuationToken = result.nextLink;
      let page = result.value || [];
      setContinuationToken(page, continuationToken);
      yield page;
    }
  }

  private async *listByDataBoxEdgeDevicePagingAll(
    deviceName: string,
    resourceGroupName: string,
    options?: StorageAccountsListByDataBoxEdgeDeviceOptionalParams
  ): AsyncIterableIterator<StorageAccount> {
    for await (const page of this.listByDataBoxEdgeDevicePagingPage(
      deviceName,
      resourceGroupName,
      options
    )) {
      yield* page;
    }
  }

  /**
   * Lists all the StorageAccounts in a Data Box Edge/Data Box Gateway device.
   * @param deviceName The device name.
   * @param resourceGroupName The resource group name.
   * @param options The options parameters.
   */
  private _listByDataBoxEdgeDevice(
    deviceName: string,
    resourceGroupName: string,
    options?: StorageAccountsListByDataBoxEdgeDeviceOptionalParams
  ): Promise<StorageAccountsListByDataBoxEdgeDeviceResponse> {
    return this.client.sendOperationRequest(
      { deviceName, resourceGroupName, options },
      listByDataBoxEdgeDeviceOperationSpec
    );
  }

  /**
   * Gets a StorageAccount by name.
   * @param deviceName The device name.
   * @param storageAccountName The storage account name.
   * @param resourceGroupName The resource group name.
   * @param options The options parameters.
   */
  get(
    deviceName: string,
    storageAccountName: string,
    resourceGroupName: string,
    options?: StorageAccountsGetOptionalParams
  ): Promise<StorageAccountsGetResponse> {
    return this.client.sendOperationRequest(
      { deviceName, storageAccountName, resourceGroupName, options },
      getOperationSpec
    );
  }

  /**
   * Creates a new StorageAccount or updates an existing StorageAccount on the device.
   * @param deviceName The device name.
   * @param storageAccountName The StorageAccount name.
   * @param resourceGroupName The resource group name.
   * @param storageAccount The StorageAccount properties.
   * @param options The options parameters.
   */
  async beginCreateOrUpdate(
    deviceName: string,
    storageAccountName: string,
    resourceGroupName: string,
    storageAccount: StorageAccount,
    options?: StorageAccountsCreateOrUpdateOptionalParams
  ): Promise<
    PollerLike<
      PollOperationState<StorageAccountsCreateOrUpdateResponse>,
      StorageAccountsCreateOrUpdateResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ): Promise<StorageAccountsCreateOrUpdateResponse> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ) => {
      let currentRawResponse:
        | coreClient.FullOperationResponse
        | undefined = undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback
        }
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON()
        }
      };
    };

    const lro = new LroImpl(
      sendOperation,
      {
        deviceName,
        storageAccountName,
        resourceGroupName,
        storageAccount,
        options
      },
      createOrUpdateOperationSpec
    );
    const poller = new LroEngine(lro, {
      resumeFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs
    });
    await poller.poll();
    return poller;
  }

  /**
   * Creates a new StorageAccount or updates an existing StorageAccount on the device.
   * @param deviceName The device name.
   * @param storageAccountName The StorageAccount name.
   * @param resourceGroupName The resource group name.
   * @param storageAccount The StorageAccount properties.
   * @param options The options parameters.
   */
  async beginCreateOrUpdateAndWait(
    deviceName: string,
    storageAccountName: string,
    resourceGroupName: string,
    storageAccount: StorageAccount,
    options?: StorageAccountsCreateOrUpdateOptionalParams
  ): Promise<StorageAccountsCreateOrUpdateResponse> {
    const poller = await this.beginCreateOrUpdate(
      deviceName,
      storageAccountName,
      resourceGroupName,
      storageAccount,
      options
    );
    return poller.pollUntilDone();
  }

  /**
   * Deletes the StorageAccount on the Data Box Edge/Data Box Gateway device.
   * @param deviceName The device name.
   * @param storageAccountName The StorageAccount name.
   * @param resourceGroupName The resource group name.
   * @param options The options parameters.
   */
  async beginDelete(
    deviceName: string,
    storageAccountName: string,
    resourceGroupName: string,
    options?: StorageAccountsDeleteOptionalParams
  ): Promise<PollerLike<PollOperationState<void>, void>> {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ): Promise<void> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ) => {
      let currentRawResponse:
        | coreClient.FullOperationResponse
        | undefined = undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback
        }
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON()
        }
      };
    };

    const lro = new LroImpl(
      sendOperation,
      { deviceName, storageAccountName, resourceGroupName, options },
      deleteOperationSpec
    );
    const poller = new LroEngine(lro, {
      resumeFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs
    });
    await poller.poll();
    return poller;
  }

  /**
   * Deletes the StorageAccount on the Data Box Edge/Data Box Gateway device.
   * @param deviceName The device name.
   * @param storageAccountName The StorageAccount name.
   * @param resourceGroupName The resource group name.
   * @param options The options parameters.
   */
  async beginDeleteAndWait(
    deviceName: string,
    storageAccountName: string,
    resourceGroupName: string,
    options?: StorageAccountsDeleteOptionalParams
  ): Promise<void> {
    const poller = await this.beginDelete(
      deviceName,
      storageAccountName,
      resourceGroupName,
      options
    );
    return poller.pollUntilDone();
  }

  /**
   * ListByDataBoxEdgeDeviceNext
   * @param deviceName The device name.
   * @param resourceGroupName The resource group name.
   * @param nextLink The nextLink from the previous successful call to the ListByDataBoxEdgeDevice
   *                 method.
   * @param options The options parameters.
   */
  private _listByDataBoxEdgeDeviceNext(
    deviceName: string,
    resourceGroupName: string,
    nextLink: string,
    options?: StorageAccountsListByDataBoxEdgeDeviceNextOptionalParams
  ): Promise<StorageAccountsListByDataBoxEdgeDeviceNextResponse> {
    return this.client.sendOperationRequest(
      { deviceName, resourceGroupName, nextLink, options },
      listByDataBoxEdgeDeviceNextOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const listByDataBoxEdgeDeviceOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataBoxEdge/dataBoxEdgeDevices/{deviceName}/storageAccounts",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.StorageAccountList
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.deviceName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const getOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataBoxEdge/dataBoxEdgeDevices/{deviceName}/storageAccounts/{storageAccountName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.StorageAccount
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.deviceName,
    Parameters.storageAccountName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const createOrUpdateOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataBoxEdge/dataBoxEdgeDevices/{deviceName}/storageAccounts/{storageAccountName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.StorageAccount
    },
    201: {
      bodyMapper: Mappers.StorageAccount
    },
    202: {
      bodyMapper: Mappers.StorageAccount
    },
    204: {
      bodyMapper: Mappers.StorageAccount
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.storageAccount,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.deviceName,
    Parameters.storageAccountName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const deleteOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataBoxEdge/dataBoxEdgeDevices/{deviceName}/storageAccounts/{storageAccountName}",
  httpMethod: "DELETE",
  responses: {
    200: {},
    201: {},
    202: {},
    204: {},
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.deviceName,
    Parameters.storageAccountName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listByDataBoxEdgeDeviceNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.StorageAccountList
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.nextLink,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.deviceName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
