jest.setTimeout(30000);

if (!(global as any).fetch) {
  (global as any).fetch = (() => {
    throw new Error("global.fetch is not mocked in this test");
  }) as any;
}
