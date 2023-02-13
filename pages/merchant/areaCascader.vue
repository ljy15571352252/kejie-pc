<template>
    <el-cascader
            :data="areaData"
            v-model="targetValue"
            :options="loadAreaData"
            @change="changeCascader"
    />
</template>

<script>
// 级联数据
import { ProvinceData, CityData, CountyData } from "./data/area";

export default {
    name: "areaCascader",
    props: {
        // 选中的地址数组
        value: Array,

        target: {
            type: String,
            default: "county", //province,city
        },
        placeholder: {
            type: String,
            default: "请选择地区",
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            // 省级
            areaData: [...ProvinceData],
            // 省市区下标值
            targetValue: [],
            townCache: {},
            init: false,
        };
    },
    watch: {
        value(cur) {
            this.targetValue = cur
        },
        targetValue(cur) {
            this.$emit('input',cur)
        },
    },
    components: {},
    computed: {},
    methods: {
        // 级联选择发生改变时
        changeCascader(val, selectedData) {
            let arr = selectedData.map(data => {
                return data.label;
            });
            this.$emit("on-change", arr);
        },
        // 加载级联
        async loadAreaData(item, callback) {
            item.loading = true;
            switch (item.target) {
                case "province":
                    item.children = [...CityData[item.value]];
                    if (this.target !== "city") {
                        item.children.map(item => {
                            item.children = [];
                            item.target = "city";
                            item.loading = false;
                        });
                    }
                    break;
                case "city":
                    item.children = [...CountyData[item.value]];
                    if (this.target !== "county") {
                        item.children.map(item => {
                            item.children = [];
                            item.target = "county";
                            item.loading = false;
                        });
                    }
                    break;
                case "county":
                    let cache = this.townCache[item.value];
                    let townList = null;
                    if (cache) {
                        townList = cache;
                    } else {
                        let res = await getTown({ parentCode: item.value });
                        townList = res.map(i => {
                            return {
                                value: parseInt(i.code),
                                label: i.name,
                            };
                        });
                        this.townCache[item.value] = townList;
                    }

                    item.children = townList;
                    /**
                     * 异步重新刷新下ui
                     * @type {(*[] & []) | *[]}
                     */
                    if (!this.init) {
                        this.targetValue = Object.assign([], this.targetValue);
                        this.init = true;
                    }

                    break;
            }
            item.loading = false;
            callback();
        },
    },
    created() {

    },
    mounted() {
        if (this.target !== "province") {
            this.areaData.map(item => {
                item.children = [];
                item.target = "province";
                item.loading = false;
            });
        }
        // 判断地址数组不为空
        if (this.isBlank(this.value) === false){
            this.targetValue = this.value;
        }

    },
};
</script>

<style scoped lang="less"></style>
