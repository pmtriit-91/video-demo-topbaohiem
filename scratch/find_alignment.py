from PIL import Image
import numpy as np

im1 = Image.open('public/assets/elements/screen3/3.1/couple.png')
im2 = Image.open('public/assets/elements/screen3/3.1/cuuple_lolang.png')

arr1 = np.array(im1)
arr2 = np.array(im2)

# Head region: y between 5% and 25% of height
h1, w1 = arr1.shape[:2]
h2, w2 = arr2.shape[:2]

head1 = arr1[int(h1*0.05):int(h1*0.25), :, 3] > 100
head2 = arr2[int(h2*0.05):int(h2*0.25), :, 3] > 100

# Project to X
x_prof1 = np.sum(head1, axis=0)
x_prof2 = np.sum(head2, axis=0)

# In im1, find female hat center and male hat center
# female is around left half, male is around right half
mid1 = w1 // 2
f_hat1 = np.argmax(x_prof1[:mid1])
m_hat1 = mid1 + np.argmax(x_prof1[mid1:])

mid2 = w2 // 2
f_hat2 = np.argmax(x_prof2[:mid2])
m_hat2 = mid2 + np.argmax(x_prof2[mid2:])

print(f"im1 width={w1}: Female hat X={f_hat1} ({f_hat1/w1:.4f}), Male hat X={m_hat1} ({m_hat1/w1:.4f})")
print(f"im2 width={w2}: Female hat X={f_hat2} ({f_hat2/w2:.4f}), Male hat X={m_hat2} ({m_hat2/w2:.4f})")

# Also find distance between the two heads
dist1 = (m_hat1 - f_hat1) / w1
dist2 = (m_hat2 - f_hat2) / w2
print(f"Head distance normalized: im1={dist1:.4f}, im2={dist2:.4f}")
print(f"Couple center normalized: im1={(f_hat1+m_hat1)/(2*w1):.4f}, im2={(f_hat2+m_hat2)/(2*w2):.4f}")
