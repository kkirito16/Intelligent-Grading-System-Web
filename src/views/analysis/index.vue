<template>
  <div class="data-analysis">
    <el-select
      v-model="selectedPaper"
      placeholder="选择试卷"
      class="select-paper"
      style="width: 300px"
    >
      <el-option
        v-for="item in paperOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </el-select>
    <div class="data-sections">
      <div class="grade-section">
        <h3>成绩分布图</h3>
        <ve-pie :data="chartData" />
      </div>
      <div class="ranking">
        <h3>错误题目数排行榜</h3>
        <el-table
          :data="mistakeTableData"
          style="width: 250px"
          max-height="350"
          :default-sort="{ prop: 'mistakeNum', order: 'descending' }"
        >
          <el-table-column type="index" width="50" align="center">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="100" align="center">
          </el-table-column>
          <el-table-column
            prop="mistakeNum"
            label="错题数"
            width="100"
            sortable
            align="center"
          >
          </el-table-column>
        </el-table>
      </div>
      <div class="ranking">
        <h3>成绩排行榜</h3>
        <el-table
          :data="gradeTableData"
          style="width: 250px"
          max-height="350"
          :default-sort="{ prop: 'mistakeNum', order: 'descending' }"
        >
          <el-table-column type="index" width="50" align="center">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="100" align="center">
          </el-table-column>
          <el-table-column
            prop="grade"
            label="成绩"
            width="100"
            sortable
            align="center"
          >
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      selectedPaper: null,
      paperOptions: [
        { label: '福建高三第二次联考-历史', value: '试卷A' },
        { label: '四川师范大学附属中学高二上半期考试', value: '试卷B' },
        { label: '四川师范大学附属中学高一下第一次期末模拟考试', value: '试卷C' },
      ],
      mistakeTableData:[],
      gradeTableData:[],
      chartData: {}
    }
  },
  mounted() {
  },
  methods: {
  },
  watch: {
    selectedPaper(newVal) {
      if (newVal === '试卷A'){
        this.chartData = {
          columns: ['成绩区间', '区间人数'],
          rows: [
            {
              成绩区间: '96-100', 区间人数: 3
            },
            {
              成绩区间: '90-95', 区间人数: 3
            },
            {
              成绩区间: '80-89', 区间人数: 17
            },
            {
              成绩区间: '70-79', 区间人数: 11
            },
            {
              成绩区间: '60-69', 区间人数: 8
            },
            {
              成绩区间: '60以下', 区间人数: 3
            }
          ]
        },
        this.mistakeTableData = [{
          name: '第10题',
          mistakeNum: 26
        },{
          name: '第8题',
          mistakeNum: 20
        },{
          name: '第5题',
          mistakeNum: 17
        },{
          name: '第7题',
          mistakeNum: 15
        },{
          name: '第4题',
          mistakeNum: 10
        },{
          name: '第2题',
          mistakeNum: 5
        }],
        this.gradeTableData = [{
          name: '唐子骏',
          grade: 99
        },{
          name: '李晗曦',
          grade: 97
        },{
          name: '王朔里',
          grade: 97
        },{
          name: '王世杰',
          grade: 95
        },{
          name: '何嘉仪',
          grade: 94
        },{
          name: '贺雨晨',
          grade: 90
        }]
      } else if(newVal === '试卷B'){
        this.chartData = {
          columns: ['成绩区间', '区间人数'],
          rows: [
            {
              成绩区间: '140-150', 区间人数: 3
            },
            {
              成绩区间: '130-139', 区间人数: 9
            },
            {
              成绩区间: '120-129', 区间人数: 22
            },
            {
              成绩区间: '110-119', 区间人数: 7
            },
            {
              成绩区间: '100-109', 区间人数: 5
            },
            {
              成绩区间: '110以下', 区间人数: 4
            }
          ]
        },
        this.mistakeTableData = [{
          name: '第21题',
          mistakeNum: 29
        },{
          name: '第12题',
          mistakeNum: 19
        },{
          name: '第16题',
          mistakeNum: 14
        },{
          name: '第22题',
          mistakeNum: 11
        },{
          name: '第7题',
          mistakeNum: 9
        },{
          name: '第11题',
          mistakeNum: 7
        }],
        this.gradeTableData = [{
          name: '张佳晨',
          grade: 148
        },{
          name: '李佳莹',
          grade: 143
        },{
          name: '何以佳',
          grade: 140
        },{
          name: '胡毅',
          grade: 137
        },{
          name: '郭亮军',
          grade: 135
        },{
          name: '郝雨欣',
          grade: 134
        }]
      } else if(newVal === '试卷C'){
        this.chartData = {
          columns: ['成绩区间', '区间人数'],
          rows: [
            {
              成绩区间: '96-100', 区间人数: 10
            },
            {
              成绩区间: '90-95', 区间人数: 14
            },
            {
              成绩区间: '80-89', 区间人数: 7
            },
            {
              成绩区间: '70-79', 区间人数: 4
            },
            {
              成绩区间: '60-69', 区间人数: 3
            },
            {
              成绩区间: '60以下', 区间人数: 1
            }
          ]
        },
        this.mistakeTableData = [{
          name: '第9题',
          mistakeNum: 15
        },{
          name: '第13题',
          mistakeNum: 12
        },{
          name: '第10题',
          mistakeNum: 9
        },{
          name: '第12题',
          mistakeNum: 7
        },{
          name: '第20题',
          mistakeNum: 5
        },{
          name: '第25题',
          mistakeNum: 2
        }],
        this.gradeTableData = [{
          name: '李文怡',
          grade: 100
        },{
          name: '陈鑫',
          grade: 99
        },{
          name: '汪佳艺',
          grade: 97
        },{
          name: '廖奕欣',
          grade: 95
        },{
          name: '曾梓',
          grade: 94
        },{
          name: '邓皓然',
          grade: 90
        }]
      }
    }
  }
}
</script>

<style>
.data-analysis {
  padding: 20px;
}
.select-paper {
  width: 200px;
  margin-bottom: 20px;
}
.data-sections {
  display: flex;
}
.grade-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  text-align: center;
  width: 30%;
  border: 1px solid #ccc;
  border-radius: 15px;
  padding: 10px;
  margin-bottom: 20px;
}
.ranking {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; /* 将项目垂直居中 */
  width: 30%;
  border: 1px solid #ccc;
  border-radius: 15px;
  padding: 10px;
  margin-bottom: 20px;
  margin-left: 20px;
}
.data-section h3 {
  margin-bottom: 10px;
}
</style>
