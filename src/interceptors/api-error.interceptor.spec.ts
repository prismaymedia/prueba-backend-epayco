import { ApiErrorInterceptor } from './api-error.interceptor';

describe('ApiErrorInterceptor', () => {
  it('should be defined', () => {
    expect(new ApiErrorInterceptor()).toBeDefined();
  });
});
