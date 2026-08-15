import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import PublicLayout from "@/app/(public)/layout";
import ResetPassword from "@/features/auth/ResetPassword";

const { replaceMock, useAuthMock } = vi.hoisted(() => ({
  replaceMock: vi.fn(),
  useAuthMock: vi.fn(),
}));

vi.mock("@contexts/AuthContext", () => ({ useAuth: useAuthMock }));
vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace: replaceMock }),
}));

describe("reset password route", () => {
  beforeEach(() => {
    useAuthMock.mockReturnValue({
      accessToken: "access-token",
      account: { id: 1, login_id: "user@example.com" },
      loading: false,
      logout: vi.fn(),
      setAccessToken: vi.fn(),
      setAccount: vi.fn(),
    });
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({}), {
          headers: { "Content-Type": "application/json" },
          status: 200,
        }),
      ),
    );
  });

  it("renders for an authenticated account without redirecting", async () => {
    render(
      <PublicLayout>
        <ResetPassword token="reset-token" />
      </PublicLayout>,
    );

    expect(
      await screen.findByRole("heading", { name: "新しいパスワード" }),
    ).toBeInTheDocument();
    await waitFor(() => expect(fetch).toHaveBeenCalled());
    expect(replaceMock).not.toHaveBeenCalled();
  });
});
