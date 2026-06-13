import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { AnnotationType, AnnotationStatus } from '../../types/enums';
import type { Annotation } from '../../types';

interface AnnotationEditModalProps {
  annotation: Annotation | null;
  onClose: () => void;
  onSave: (id: string, content: string, status: AnnotationStatus) => void;
  isCreating?: boolean;
}

const labelByType = {
  [AnnotationType.Issue]: '问题',
  [AnnotationType.Description]: '说明',
  [AnnotationType.Change]: '变更'
};

const labelByStatus = {
  [AnnotationStatus.Pending]: '待处理',
  [AnnotationStatus.InProgress]: '处理中',
  [AnnotationStatus.Resolved]: '已解决'
};

const statusOptions = [
  { value: AnnotationStatus.Pending, label: labelByStatus[AnnotationStatus.Pending], color: '#c18a3d' },
  { value: AnnotationStatus.InProgress, label: labelByStatus[AnnotationStatus.InProgress], color: '#4a7db8' },
  { value: AnnotationStatus.Resolved, label: labelByStatus[AnnotationStatus.Resolved], color: '#4f8f6f' }
];

export function AnnotationEditModal({
  annotation,
  onClose,
  onSave,
  isCreating = false
}: AnnotationEditModalProps) {
  const [content, setContent] = useState('');
  const [status, setStatus] = useState<AnnotationStatus>(AnnotationStatus.Pending);

  useEffect(() => {
    if (annotation) {
      setContent(annotation.content);
      setStatus(annotation.status);
    } else {
      setContent('');
      setStatus(AnnotationStatus.Pending);
    }
  }, [annotation]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (annotation && content.trim()) {
      onSave(annotation.id, content.trim(), status);
    }
  };

  if (!annotation) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
        <header className="modal-header">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--text-muted)]">
              {labelByType[annotation.type]}
            </p>
            <h2 className="mt-1 text-lg font-semibold text-[color:var(--text-primary)]">
              {isCreating ? '新建标注' : '编辑标注'}
            </h2>
          </div>
          <button className="icon-button" onClick={onClose} type="button">
            <X className="h-4 w-4" />
          </button>
        </header>

        <form onSubmit={handleSubmit} className="modal-body">
          <div className="form-group">
            <label className="form-label">标注内容</label>
            <textarea
              className="form-textarea"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="请输入标注内容..."
              rows={4}
              autoFocus
            />
          </div>

          <div className="form-group">
            <label className="form-label">处理状态</label>
            <div className="segmented-control w-full">
              {statusOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  data-active={status === option.value}
                  onClick={() => setStatus(option.value)}
                  className="flex-1"
                >
                  <span className="inline-flex items-center gap-2">
                    <span
                      className="inline-block h-2 w-2 rounded-full"
                      style={{ background: option.color }}
                    />
                    {option.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <p className="text-xs text-[color:var(--text-muted)]">
              创建者：{annotation.author} · 创建时间：
              {new Date(annotation.createdAt).toLocaleString('zh-CN')}
            </p>
          </div>
        </form>

        <footer className="modal-footer">
          <button className="secondary-button" onClick={onClose} type="button">
            取消
          </button>
          <button
            className="primary-button"
            onClick={handleSubmit}
            type="button"
            disabled={!content.trim()}
          >
            保存
          </button>
        </footer>
      </div>
    </div>
  );
}
