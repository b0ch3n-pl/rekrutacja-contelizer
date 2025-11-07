import { render, screen, fireEvent, act } from "@testing-library/react";
import { PeselChecker } from "../pages/PeselChecker";
import "@testing-library/jest-dom";
import { vi } from "vitest";

// mock tłumaczeń
vi.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: (key: string) => {
            const dict: Record<string, string> = {
                "pesel.number.tooShort": "Za krótki numer!",
                "pesel.number.wrong": "Niepoprawny numer PESEL!",
                "pesel.number.ok": "Brawo, PESEL poprawny!",
                "pesel.bigButton": "Sprawdź",
                "pesel.inputPlaceholder": "tu wpisz numer",
            };
            return dict[key] || key;
        },
    }),
}));

describe("PeselChecker component", () => {
    const typePesel = (value: string) => {
        const input = screen.getByPlaceholderText("tu wpisz numer");
        const button = screen.getByRole("button", { name: "Sprawdź" });

        act(() => {
            fireEvent.change(input, { target: { value } });
            fireEvent.click(button);
        });
    };

    beforeEach(() => {
        render(<PeselChecker />);
    });

    it("pokazuje błąd dla zbyt krótkiego numeru", async () => {
        typePesel("12345");
        expect(await screen.findByText("Za krótki numer!")).toBeInTheDocument();
    });

    it("pokazuje błąd dla niepoprawnego numeru PESEL", async () => {
        typePesel("44051401358"); // błędna suma kontrolna
        expect(await screen.findByText("Niepoprawny numer PESEL!")).toBeInTheDocument();
    });

    it("pokazuje sukces dla poprawnego numeru PESEL", async () => {
        typePesel("44051401359"); // poprawny
        expect(await screen.findByText("Brawo, PESEL poprawny!")).toBeInTheDocument();
    });
});
