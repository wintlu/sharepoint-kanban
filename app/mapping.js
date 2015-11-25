export const Mapping = {
    toClientItems: function(items) {
        const self = this;
        return items.map(i => {
            return self.toClientItem(i);
        });
    },
    toClientItem: function (i) {
        const labels = i.Labels ? (i.Labels.results) : [];
        const assignee = i.AssignedToId ? i.AssignedToId.results : [];
        return {
            id: i.ID,
            title: i.Title,
            description: i.Body,
            labels: labels,
            status: i.Status,
            assignee: assignee
        }
    },
    toServerItem: function (i) {
        const assignee = i.assignee ? i.assignee : [];
        
        return {
            Title: i.title,
            Body: i.description,
            Status: i.status,
        }
    }
}