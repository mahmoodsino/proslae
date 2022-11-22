import React from "react";
import { ArrowBackUp } from "tabler-icons-react";
import { FadeMotion } from "../motions";
import { useShowStickyHeader } from "../../helpers/hooks";

export default function MoveTopBTN() {
  const { showHeader } = useShowStickyHeader.default();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <FadeMotion isShow={showHeader}>
      <button className="mv_top" onClick={scrollToTop}>
        <ArrowBackUp />
      </button>
    </FadeMotion>
  );
}
