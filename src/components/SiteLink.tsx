import { Link } from 'react-router-dom'
import { isInternalHref } from '../data/routes'
import type { AnchorHTMLAttributes, ReactNode } from 'react'

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string
  children: ReactNode
}

export function SiteLink({ href, children, ...rest }: Props) {
  if (isInternalHref(href)) {
    const { target, rel, ...linkRest } = rest
    return (
      <Link to={href} {...linkRest}>
        {children}
      </Link>
    )
  }

  return (
    <a href={href} {...rest}>
      {children}
    </a>
  )
}
