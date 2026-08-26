import { renderHook } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";

import { useListNavigation } from "@/hooks/useListNavigation";

/**
 * 상세 화면은 검색 조건을 `location.state?.searchCondition` 으로 읽는다 —
 * 목록을 거치지 않고 들어오면 없다. 그때도 목록 주소는 만들어져야 한다.
 */
const wrapper = ({ children }) => <MemoryRouter>{children}</MemoryRouter>;

describe("useListNavigation.getBackToListURL", () => {
  const setup = () =>
    renderHook(() => useListNavigation("BBSMSTR_BBBBBBBBBBBB"), { wrapper });

  it("검색 조건이 없으면 목록 주소만 돌려준다", () => {
    const { result } = setup();

    expect(result.current.getBackToListURL("/inform/gallery", undefined)).toBe(
      "/inform/gallery"
    );
  });

  it("검색 조건이 있으면 쿼리로 붙인다", () => {
    const { result } = setup();

    expect(
      result.current.getBackToListURL("/inform/gallery", {
        pageIndex: 2,
        searchCnd: "1",
        searchWrd: "공지",
      })
    ).toBe("/inform/gallery?page=2&searchCnd=1&searchWrd=%EA%B3%B5%EC%A7%80");
  });

  it("기본 검색 조건은 쿼리를 만들지 않는다", () => {
    const { result } = setup();

    expect(
      result.current.getBackToListURL("/inform/gallery", {
        pageIndex: 1,
        searchCnd: "0",
        searchWrd: "",
      })
    ).toBe("/inform/gallery");
  });
});
