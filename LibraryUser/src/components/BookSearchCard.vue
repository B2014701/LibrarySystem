<template>
    <div class="input-group">
        <InputSearch v-model="searchText"/>
    </div>
    <div class="SearchItems-Group">
        <BookList 
            v-if="filteredBooksCount > 0"
            :books="filteredBooks"
            v-model:activeIndex="activeIndex"
        />
        <p v-else>Không có sách nào.</p>
    </div>
</template>

<script>
import BooksService from '@/services/book.service.js';
import BookList from '@/components/BookList.vue';
import InputSearch from './InputSearch.vue';

export default {
    data() {
        return {
            books: [],
            searchText: "",
            activeIndex: -1,
        }
    },

    components: {
        BookList,
        InputSearch,
    },

    methods: {
        async retrieveBooks() {
            try {
                this.books = await BooksService.getAll();
            } catch (error) {
                console.error(error);
            }
        },

        refreshList() {
            this.retrieveBooks();
        },
    },

    mounted() {
        this.refreshList();
        this.searchText = this.searchText.toLowerCase(); // Chuyển đổi chuỗi tìm kiếm về chữ thường khi component được tạo ra
    },

    computed: {
        filteredBooks() {
            if (!this.searchText) return this.books;
            const searchTextLower = this.searchText.toLowerCase(); // Chuyển đổi chuỗi tìm kiếm về chữ thường
            return this.books.filter(book => {
                const { name, authorName } = book;
                const bookString = [name, authorName].join("").toLowerCase(); // Chuyển đổi chuỗi từng cuốn sách về chữ thường
                return bookString.includes(searchTextLower); // Tìm kiếm không phân biệt chữ hoa chữ thường
            });
        },

        filteredBooksCount() {
            return this.filteredBooks.length;
        },
    },
}
</script>

<style scoped>
/* CSS của bạn */
</style>
