<template>
  <router-link
    class="nav-link"
    :to="link"
    v-if="!isExternal(link) && !isVersionLink"
    :exact="exact"
    replace 
  >{{ item.text }}</router-link>
  <a
    v-else-if="isVersionLink"
    :href="link"
    class="nav-link"
  >
    {{ item.text }}
  </a>
  <a
    v-else
    :href="link"
    class="nav-link external"
    :target="isMailto(link) || isTel(link) ? null : '_blank'"
    :rel="isMailto(link) || isTel(link) ? null : 'noopener noreferrer'"
  >
    {{ item.text }}
    <OutboundLink/>
  </a>
</template>

<script>
import { isExternal, isMailto, isTel, ensureExt } from './util'

export default {
  props: {
    item: {
      required: true
    }
  },
  computed: {
    link () {
      return ensureExt(this.item.link)
    },
    isVersionLink () {
      return this.item.tags && this.item.tags.indexOf('versions') > -1
    },
    exact () {
      if (this.$site.locales) {
        return Object.keys(this.$site.locales).some(rootLink => rootLink === this.link)
      }
      return this.link === '/'
    }
  },
  methods: {
    isExternal,
    isMailto,
    isTel
  }
}
</script>
