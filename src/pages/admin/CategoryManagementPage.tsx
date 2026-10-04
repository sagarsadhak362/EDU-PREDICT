import React, { useState } from 'react';
import { Layers, Plus, Edit, Trash2, BookOpen } from 'lucide-react';
import { COURSE_CATEGORIES } from '../../data/coursesData';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';

interface CategoryManagementPageProps {
  onShowToast: (type: 'success' | 'error' | 'info', title: string, msg?: string) => void;
}

export const CategoryManagementPage: React.FC<CategoryManagementPageProps> = ({ onShowToast }) => {
  const [categories, setCategories] = useState(COURSE_CATEGORIES);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCatName, setNewCatName] = useState('');
  const [newCatDesc, setNewCatDesc] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const newCat = {
      id: `cat-${Date.now()}`,
      name: newCatName,
      count: 0,
      icon: 'BookOpen',
      description: newCatDesc,
    };
    setCategories([...categories, newCat]);
    setIsAddModalOpen(false);
    onShowToast('success', 'Category Created', `${newCat.name} track added.`);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Curriculum Category Taxonomy</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage course domains, academic tracks, and catalog groupings.
          </p>
        </div>
        <Button
          size="sm"
          icon={<Plus className="w-4 h-4" />}
          onClick={() => setIsAddModalOpen(true)}
        >
          Add New Category
        </Button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600">
                  <Layers className="w-5 h-5" />
                </div>
                <Badge variant="indigo" size="sm">{cat.count} Programs</Badge>
              </div>

              <h3 className="text-lg font-bold text-slate-900">{cat.name}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{cat.description}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
              <span className="font-mono">{cat.id}</span>
              <button
                onClick={() => onShowToast('info', 'Edit Category', 'Category properties updated.')}
                className="text-indigo-600 font-semibold hover:text-indigo-800 cursor-pointer"
              >
                Configure Track
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Curriculum Category"
        subtitle="Create a new grouping for course programs"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleAdd}>
              Create Category
            </Button>
          </>
        }
      >
        <form onSubmit={handleAdd} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Category Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Cloud Computing & DevOps"
              value={newCatName}
              onChange={(e) => setNewCatName(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Description</label>
            <textarea
              rows={3}
              placeholder="Description of skills taught in this discipline..."
              value={newCatDesc}
              onChange={(e) => setNewCatDesc(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};

