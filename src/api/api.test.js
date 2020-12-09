/* eslint-disable prefer-const */
/* eslint-disable no-await-in-loop */
/* global describe, test, expect */
import fetch, { enableFetchMocks } from 'jest-fetch-mock';
import api from './api';

enableFetchMocks();

describe('api', () => {
  describe('fetchSearchID', () => {
    test('Resolve', async () => {
      fetch.dontMock();
      await expect(api.fetchSearchID()).resolves.toHaveProperty('searchId');
    });

    test('Reject', async () => {
      fetch.mockRejectOnce();
      await expect(api.fetchSearchID()).rejects.toThrow('Failed to fetch searchId');
    });
  });

  describe('fetchTickets', () => {
    test('Resolve', async () => {
      fetch.dontMock();
      await expect(api.fetchTickets()).resolves.toHaveProperty('tickets');
    });

    test('Reject', async () => {
      fetch.mockRejectOnce();
      await expect(api.fetchTickets()).rejects.toThrow('Failed to fetch tickets');
    });
  });
});
