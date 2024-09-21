import "@testing-library/jest-dom/vitest";
import { mockServer } from "./mocks/server";

beforeAll(() => mockServer.listen());
afterAll(() => mockServer.close());
afterEach(() => mockServer.resetHandlers());
