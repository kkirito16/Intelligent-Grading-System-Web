<template>
  <div class="paper-list">
    <div class="filter">
      <el-select
        class="selectedPaper"
        v-model="selectedPaper"
        placeholder="请选择试卷"
      >
        <el-option
          v-for="item in paperOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-select
        class="questionType"
        v-model="selectedType"
        clearable
        placeholder="请选择题型"
      >
        <el-option label="单选题" value="单选题"></el-option>
        <el-option label="多选题" value="多选题"></el-option>
        <el-option label="问答题" value="问答题"></el-option>
      </el-select>
      <el-input
        class="questionSearch"
        v-model="searchText"
        placeholder="请输入搜索内容"
      ></el-input>
      <el-upload
        class="upload-demo"
        action=""
        accept="image/*"
        :show-file-list="false"
        :on-error="handleUploadSuccess"
      >
        <el-button type="primary">上传</el-button>
      </el-upload>
      <el-button
        type="primary"
        @click="openRealTimeDataInput"
        class="realTimeDataInput"
        >实时录入</el-button
      >
      <el-dialog
        title="实时录入"
        :visible.sync="photoDialogVisible"
        center
        :show-close="false"
        width="40%"
      >
        <div slot="footer">
          <el-button @click="saveData" type="primary">拍照</el-button>
          <el-button @click="cancel">取消</el-button>
        </div>
        <!-- 视频区域 -->
        <div class="video-area">
          <video
            ref="videoPlayer"
            src="../../assets/video.mp4"
            style="width: 100%; height: 100%"
            autoplay
          ></video>
        </div>
      </el-dialog>
      <el-dialog
        title="上传成功"
        :visible.sync="uploadSuccessDialogVisible"
        width="30%"
        center
        :show-close="false"
      >
        <span>试卷已载入试题列表</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="closeUploadSuccessDialog"
            >确定</el-button
          >
        </span>
      </el-dialog>
    </div>

    <div class="question-list">
      <el-table :data="questions" border>
        <el-table-column
          label="题型"
          prop="type"
          width="80"
          align="center"
        ></el-table-column>
        <el-table-column label="题目" prop="content" align="center">
          <template slot-scope="{ row }">
            <div class="ellipsis-container" :title="row.content">
              {{ row.content }}
            </div>
          </template>
        </el-table-column>

        <el-table-column label="评价" prop="review" align="center">
          <template slot-scope="{ row }">
            <div class="ellipsis-container" :title="row.content">
              {{ row.review }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog
      title="编辑试题"
      :visible.sync="dialogVisible"
      width="50%"
      center
      :show-close="false"
    >
      <div class="modelMain">
        <div class="left-part">
          <img :src="questionUrl" v-if="questionUrl" class="questionImage" />
        </div>
        <div class="right-part">
          <el-input
            v-model="comment"
            type="textarea"
            :rows="17"
            placeholder="请输入评论内容"
          ></el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveEdit">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  paperOptions,
  paperAQuestions,
  paperBQuestions,
  paperCQuestions,
} from "./meta"
export default {
  data() {
    return {
      selectedPaper: "",
      selectedType: "",
      searchText: "",
      questions: [],
      dialogVisible: false, // 控制编辑弹框的显示与隐藏
      photoDialogVisible: false,
      paperOptions: paperOptions,
      originalQuestions: [], // 保存原始数据
      comment: "", // 评论内容
      editingIndex: null, // 保存当前编辑行的索引
      questionUrl: "", // 试题图片地址
      uploadSuccessDialogVisible: false, // 控制上传成功提示框的显示与隐藏
    }
  },
  methods: {
    handleEdit(index, row) {
      this.dialogVisible = true
      // 将当前编辑行的索引保存到editingIndex变量中
      this.editingIndex = index
      this.questionUrl = row.imgUrl
      this.comment = row.review
    },
    saveEdit() {
      this.dialogVisible = false // 点击保存按钮后隐藏编辑弹框
      // 获取当前编辑行的索引
      const index = this.editingIndex
      this.questions[index].review = this.comment
    },
    handleUploadSuccess() {
      setTimeout(() => {
        this.uploadSuccessDialogVisible = true
      }, 1000) //模拟真正上传状态
    },
    closeUploadSuccessDialog() {
      this.uploadSuccessDialogVisible = false
    },
    openRealTimeDataInput() {
      this.photoDialogVisible = true // 打开实时录入弹框
      this.$refs.videoPlayer.play()
    },
    saveData() {
      this.handleUploadSuccess()
      setTimeout(() => {
        this.photoDialogVisible = false
        this.$refs.videoPlayer.pause()
      }, 1000)
    },
    cancel() {
      this.photoDialogVisible = false
      this.$refs.videoPlayer.pause()
    },
  },
  watch: {
    selectedPaper(val) {
      if (val === "试卷A") {
        this.questions = paperAQuestions
        this.originalQuestions = paperAQuestions // 保存原始数据
      } else if (val === "试卷B") {
        this.questions = paperBQuestions
        this.originalQuestions = paperBQuestions // 保存原始数据
      } else if (val === "试卷C") {
        this.questions = paperCQuestions
        this.originalQuestions = paperCQuestions // 保存原始数据
      }
    },
    selectedType(val) {
      if (val === "单选题") {
        // 筛选单选题
        this.questions = this.originalQuestions.filter(
          (item) => item.type === "单选题"
        )
      } else if (val === "多选题") {
        // 筛选多选题
        this.questions = this.originalQuestions.filter(
          (item) => item.type === "多选题"
        )
      } else if (val === "问答题") {
        // 筛选问答题
        this.questions = this.originalQuestions.filter(
          (item) => item.type === "问答题"
        )
      } else {
        // 如果选择了空值，则显示所有题目
        this.questions = this.originalQuestions
      }
    },
    searchText(val) {
      // 根据搜索内容进行筛选
      this.questions = this.originalQuestions.filter((item) =>
        item.content.includes(val)
      )
    },
  },
}
</script>

<style scoped>
.modelMain {
  display: flex;
  flex-direction: row;
  text-align: center;
  align-items: center;
  justify-content: center;
}
.paper-list {
  margin-bottom: 20px;
}

.filter {
  margin-bottom: 10px;
  display: flex;
}

.selectedPaper {
  margin-right: 20px;
}

.left-part {
  display: flex;
  flex-direction: row;
  text-align: center;
  align-items: center;
  justify-content: center;
  width: 720px;
  height: 360px;
  border: 1px dashed lightgray;
  border-radius: 10px;
}
.questionImage {
  width: 720px;
  height: 360px;
}

.right-part {
  margin-left: 20px;
}

.questionType {
  margin-right: 20px;
}
.questionSearch {
  width: 400px;
}
.question-list {
  max-height: 650px; /* 设置试题列表的最大高度 */
  overflow-y: auto; /* 设置当内容溢出时显示滚动条 */
}
.upload-demo {
  margin-left: 20px;
}
/* 编辑弹框样式 */
.dialog-footer {
  text-align: right;
}
.ellipsis-container {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3; /* 设置最大展示三行 */
  overflow: hidden;
}
.realTimeDataInput {
  margin-left: 20px;
}
.video-area {
  width: 720px;
  height: 360px;
}
.video::-webkit-media-controls-enclosure {
  display: none;
}
</style>
