import { forwardRef } from "react";
import NextLink, { type LinkProps } from "next/link";

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function NavLink(props, ref) {
  const { as, href, ...rest } = props;

  return (
    <NextLink href={href} as={as} legacyBehavior>
      <a ref={ref} {...rest} />
    </NextLink>
  );
});
