'use client'

import {ImageLoaderProps} from 'next/image'

export default function passthroughLoader({ src }: ImageLoaderProps) {
  return src
}
