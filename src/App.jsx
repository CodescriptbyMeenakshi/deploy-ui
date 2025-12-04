import { 
  Typography, Card, CardContent, Button, Grid, Box, Chip, IconButton, 
  Paper, Divider, useTheme 
} from '@mui/material';
import { ContentCopy, Check, Build, Speed, Storage } from '@mui/icons-material';
import { useState, useEffect } from 'react';

export default function App() {
  const theme = useTheme();
  const [copied, setCopied] = useState({});
  const appTitle = import.meta.env.VITE_APP_TITLE;

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopied({ ...copied, [label]: true });
    setTimeout(() => setCopied({}), 2000);
  };

  const deployCards = [
    { title: 'Netlify', subtitle: 'Drag dist/ folder', color: 'success', cmd: 'npm run build' },
    { title: 'Vercel', subtitle: 'vercel CLI', color: 'primary', cmd: 'npm i -g vercel && vercel' },
    { title: 'GitHub Pages', subtitle: 'gh-pages', color: 'warning', cmd: 'npm run deploy' }
  ];

  return (
    <Box sx={{ 
      bgcolor: 'gradient.main', 
      minHeight: '100vh', 
      p: { xs: 2, md: 6 },
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background gradient */}
      <Box sx={{ 
        position: 'absolute', 
        top: 0, left: 0, right: 0, bottom: 0, 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        zIndex: -1 
      }} />
      
      <Grid container spacing={6} justifyContent="center" alignItems="flex-start" maxWidth="lg" mx="auto">
        {/* Header */}
        <Grid item xs={12}>
          <Paper elevation={12} sx={{ p: 4, mb: 4, bgcolor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)' }}>
            <Typography variant="h2" sx={{ color: 'white', fontWeight: 800, textAlign: 'center', mb: 1 }}>
              {appTitle}
            </Typography>
            <Chip 
              icon={<Build color="secondary" />} 
              label="Production Ready" 
              color="secondary" 
              size="large"
              sx={{ fontSize: '1.1rem' }}
            />
          </Paper>
        </Grid>

        {/* Deploy Cards */}
        {deployCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} key={card.title}>
            <Card
              elevation={12}
              sx={{
                height: 220,
                borderRadius: 4,
                bgcolor: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'translateY(-12px)',
                  boxShadow: `0 20px 40px ${theme.palette[card.color].main}20`,
                  border: `2px solid ${theme.palette[card.color].main}`
                }
              }}
            >
              <CardContent sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <Chip label={card.title} color={card.color} size="small" />
                  <IconButton 
                    onClick={() => copyToClipboard(card.cmd, card.title)}
                    size="small"
                    sx={{ ml: 'auto' }}
                  >
                    {copied[card.title] ? <Check color="success" /> : <ContentCopy />}
                  </IconButton>
                </Box>
                
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  {card.subtitle}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Button 
                  variant="contained" 
                  color={card.color}
                  fullWidth
                  size="large"
                  sx={{ borderRadius: 2, mt: 'auto' }}
                >
                  Deploy Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}

        {/* Build Stats */}
        <Grid item xs={12}>
          <Paper elevation={8} sx={{ p: 4, bgcolor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)' }}>
            <Typography variant="h5" sx={{ color: 'white', mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Speed /> Build Stats
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={4}>
                <Typography variant="body2" color="text.secondary">Bundle Size</Typography>
                <Typography variant="h4" color="success.main">99KB gzipped</Typography>
              </Grid>
              <Grid item xs={6} sm={4}>
                <Typography variant="body2" color="text.secondary">Vendor Chunk</Typography>
                <Typography variant="h4" color="primary.main">11KB</Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="body2" color="text.secondary">API Ready</Typography>
                <Typography variant="h6" color="secondary.main">
                  {import.meta.env.VITE_API_URL}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
