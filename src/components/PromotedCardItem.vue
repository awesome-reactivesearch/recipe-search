<template>
  <a-card hoverable class="promoted-card">
    <a-row type="flex" justify="space-between" align="middle">
      <h3>
        <img
          src="https://img.icons8.com/emoji/48/000000/speaker-medium-volume.png"
        />
        <span>{{ promotedItem.title.trim().replace(/[()]/g, "") }}</span>
      </h3>
      <a-tag :color="'red'">Promoted</a-tag>
    </a-row>

    <!-- footer -->
    <a-row type="flex" justify="space-between" align="bottom"
      ><span>
        Sponsored by :
        <a-tooltip title="See Full Recipe!">
          <a
            :href="'https://' + promotedItem.link"
            target="_blank"
            rel="noreferrer"
          >
            {{ getHostname(promotedItem.link) }}
          </a>
        </a-tooltip>
      </span>
      <i> Powered by Query Rules</i>
    </a-row>
  </a-card>
</template>

<script>
export default {
  name: "PromotedCardItem",
  props: {
    promotedItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    getHostname(url) {
      let urlLocal = url;
      let tempProtocol = "";
      // use URL constructor and return hostname
      if (urlLocal.indexOf("://") === -1) {
        tempProtocol = "https://";
        urlLocal = tempProtocol + urlLocal;
      }
      return new URL(urlLocal).hostname.split(".")[1];
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
i {
  text-align: right;
}
a {
  color: #42b983;
}

.promoted-card {
  width: 100%;
  border: 1px solid rgb(207, 20, 33);
  border-radius: 5px;
}

.promoted-card > div.ant-card-body > div.ant-row-flex:first-of-type {
  min-height: 40px;
  flex-wrap: wrap;
  gap: 10px;
  flex: 1 1 0%;
}

.promoted-card > div.ant-card-body > div.ant-row-flex:first-of-type > h3 {
  height: auto;
  white-space: pre-wrap;
  margin-bottom: 0px;
  line-height: 15px;
  font-size: 14px;
  color: rgb(255, 127, 127);
  display: flex;
  align-items: center;
  gap: 7px;
  text-align: left;
}

.promoted-card > div.ant-card-body > div.ant-row-flex:first-of-type > h3 > img {
  transform: rotate(-25deg);
  height: 30px;
  position: relative;
  top: 1px;
}

.promoted-card
  > div.ant-card-body
  > div.ant-row-flex:first-of-type
  span.ant-tag-red {
  font-size: 14px;
  text-transform: uppercase;
  font-weight: 600;
  border-radius: 40px;
  padding: 2px 8px;
  line-height: unset;
  margin-right: 0px;
}

.promoted-card > div.ant-card-body > div.ant-row-flex:nth-of-type(2) {
  padding: 10px 0px;
  text-align: left;
  line-height: 15px;
  flex-wrap: nowrap;
}
</style>
