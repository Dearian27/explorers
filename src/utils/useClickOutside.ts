import { useEffect } from "react";

const useClickOutside = <T extends HTMLElement>(
  refs: React.RefObject<T>[],
  callback: (event: MouseEvent) => void
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        refs.every(
          (ref) => ref.current && !ref.current.contains(event.target as Node)
        )
      ) {
        callback(event);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [refs, callback]);
};

export default useClickOutside;
