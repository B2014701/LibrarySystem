import createApiClient from "./api.service";

class BookDetailService {
    constructor(baseUrl = "/api/bookDetails") {
        this.api = createApiClient(baseUrl);
    }

    async getDetail(id) {
        return (await this.api.get(`/${id}`)).data;
    }

    async getBorrow() {
        return (await this.api.put(`/borrowList`)).data;
    }

    async deleteDetail(id) {
        return (await this.api.delete(`/${id}`)).data;
    }

    async borrow(id, username, borrowDate, returnDate) {
        return (await this.api.get(`/borrow/${id}?username=${username}&borrowDate=${borrowDate}&returnDate=${returnDate}`)).data;
    }

    async updateBorrowDates(id, borrowDate, returnDate) {
        return (await this.api.put(`/borrow/${id}`, { borrowDate, returnDate })).data;
    }

    async return(id) {
        return (await this.api.put(`/borrow/${id}`)).data;
    }
}

export default new BookDetailService();
