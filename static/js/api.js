// Server calls shared by more than one module.

export async function fetchSetMembers(tagId) {
    const res = await fetch(`/api/tags/${tagId}/cards`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
}